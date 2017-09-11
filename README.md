# Geo mapping schools

This is a simple tool that takes a list of coordinates and groups them into sets of locations that sales reps can visit in single day trips.

# Tools

This was built using the following tools, which sort of explains why it's such a mess:
- [Yeoman](http://yeoman.io/)
- [Isomorphic react generator](https://github.com/kriasoft/react-starter-kit)
- [React google maps](https://github.com/tomchentw/react-google-maps)

*Note:* If you want to use this, you will have to provide your own `./src/constants/schools.js` which just needs to export an array of schools, which look like:

```js
{ 
  crmId: 123, 
  name: "Sha's cool school", 
  relationshipToParentAccount: "", 
  organisationSubType: "Secondary", 
  accountOwner: "Batman", 
  type: "Customer",
  billingCity: "Arkam", 
  totalViews3Months: 90, 
  lat: 57.20752, 
  lng: -2.1731309 
}
```