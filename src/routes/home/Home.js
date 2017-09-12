/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import _ from "lodash";

import {default as React, PropTypes, Component } from 'react';

import Helmet from "react-helmet";

import {
  withGoogleMap,
  GoogleMap,
  Marker,
} from "../../google-maps";

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.scss';

import runCalculations from "../../data/calculations";
import colors from "../../constants/colors";

const SimpleMapExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{lat: 51.521, lng: -0.145569}}
  >
    {props.markers.map((m, i) => (
      <div>
        <Marker position={{lat: m.lat, lng: m.lng}} 
          title={`${m.name} \n ${m.type} \n ${m.organisationSubType}` } icon={{
          path: google.maps.SymbolPath.CIRCLE,
          strokeColor: colors[i],
          scale: 4
        }} />
        {m.visits.map(v => (
          <Marker position={{lat: v.lat, lng: v.lng}} title={`${v.name} \n ${v.type} \n ${v.organisationSubType}` }icon={{
            path: (v.type === "Customer" ? google.maps.SymbolPath.BACKWARD_CLOSED_ARROW : google.maps.SymbolPath.FORWARD_OPEN_ARROW),
            strokeColor: colors[i],
            scale: 4
        }} />
        ))}
      </div>
    ))}
  </GoogleMap>
));

/*
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
export default class SimpleMapExample extends Component {
  constructor(props){
    super(props);
  }
  componentWillMount() {
    this.setState({
      feColleges: runCalculations()
    })
  }
  buildCsvEntry(c,i) {
    return [c.crmId, c.name, c.relationshipToParentAccount, c.organisationSubType, c.accountOwner, c.type, c.billingCity, c.totalViews3Months, c.lat, c.lng, i].join(',') + '\n';
  }
  onClickSaveCsv(e){
    var csvString = "data:text/csv;charset=utf-8, \ncrmId,name,relationshipToParentAccount,organisationSubType,accountOwner,type,billingCity,totalViews3Months,lat,lng,group\n"
    _.each(this.state.feColleges, (c, i) =>{
      csvString += this.buildCsvEntry(c,i);
      _.each(c.visits, s => csvString += this.buildCsvEntry(s, i));
    })
      
    var encodedUri = encodeURI(csvString);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "my_data.csv");
    document.body.appendChild(link); // Required for FF
    
    link.click(); 
  }
  render() {
    return (
      <div>
        <SimpleMapExampleGoogleMap
          markers={this.state.feColleges}
          containerElement={
            <div className={s.root} style={{ height: `700px` }} />
          }
          mapElement={
            <div style={{ height: `100%` }} />
          }
        />
        <button onClick={this.onClickSaveCsv.bind(this)}>Save to CSV</button>
      </div>
    );
  }
}

// function Home({ news }) {
//   return (
//     <div className={s.root}>
//       <div className={s.container}>
//         <h1 className={s.title}>React.js News</h1>
//         <ul className={s.news}>
//           {news.map((item, index) => (
//             <li key={index} className={s.newsItem}>
//               <a href={item.link} className={s.newsTitle}>{item.title}</a>
//               <span
//                 className={s.newsDesc}
//                 dangerouslySetInnerHTML={{ __html: item.contentSnippet }}
//               />
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// Home.propTypes = {
//   news: PropTypes.arrayOf(PropTypes.shape({
//     title: PropTypes.string.isRequired,
//     link: PropTypes.string.isRequired,
//     contentSnippet: PropTypes.string,
//   })).isRequired,
// };
