import _ from "lodash";

import schools from "../constants/schools";

const FE_COLLEGE = "FE College";
const CUSTOMER = "Customer";

const getFeColleges = function() {
    return _.filter(schools, school => school.organisationSubType === FE_COLLEGE);
}

const getSchoolsToVisit = function () {
    return _.filter(schools, school => school.organisationSubType !== FE_COLLEGE && school.type !== CUSTOMER);
}

const getLowUsageSchools = function() {
    return _.filter(schools, school => school.organisationSubType !== FE_COLLEGE && school.type === CUSTOMER);
}

function distanceFormula(lat1, lon1, lat2, lon2) {
    var a = lat1 - lat2;
    var b = lon1 - lon2;
    var c = Math.sqrt(Math.pow(Math.abs(a), 2) + Math.pow(Math.abs(b), 2));
    return c;
  }

const distance = function(from, to) {
    return distanceFormula(
        from.lat,
        from.lng,
        to.lat,
        to.lng
      );
}

const runCalculations = function() {
    const feColleges = getFeColleges();
    const schoolsToVisit = getSchoolsToVisit();
    const lowUsageSchools = getLowUsageSchools();

    _.each(feColleges, feCollege => {
        var sorted = _.orderBy(schoolsToVisit, school => distance(school, feCollege));
        feCollege.visits = _.take(sorted, 2);
    });

    
    _.each(feColleges, feCollege => {
        var maxDistance = _.max(_.map(feCollege.visits, school => distance(school, feCollege)));
        console.log(feCollege, maxDistance);
        _.each(lowUsageSchools, school => {
            if(distance(school, feCollege) < maxDistance * 2)
                feCollege.visits.push(school);
        });    
    });
    return feColleges;
}

export default runCalculations;