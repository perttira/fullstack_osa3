(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{16:function(e,t,n){e.exports=n(43)},41:function(e,t,n){},43:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(15),s=n.n(o),l=n(3),i=n(4),u=n(6),c=n(5),m=n(7),p=n(2),d=n.n(p),h="/api/persons",f={getAll:function(){return d.a.get(h)},create:function(e){return d.a.post(h,e)},update:function(e){return d.a.put("".concat(h,"/").concat(e.id),e)},remove:function(e){return d.a.delete("".concat(h,"/").concat(e))}},v=(r.a.Component,function(e){e.kurssinNimi;var t=e.nimi,n=e.tehtavia;e.tehtavatYhteensa;return r.a.createElement("div",null,r.a.createElement("span",null,t),r.a.createElement("span",{class:"tehtavat"},n))}),b=function(e){var t=e.name,n=e.id,a=e.number,o=e.onClick;return console.log("Henkilot id",n),r.a.createElement("div",null,r.a.createElement("li",null,t," ",a," ",r.a.createElement("button",{onClick:o},"Poista henkil\xf6")))},g=(n(41),function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(u.a)(this,Object(c.a)(t).call(this,e))).addPerson=function(e){e.preventDefault();var t=!1,a={name:n.state.newName,number:n.state.newNumber};n.state.persons.forEach(function(e){e.name===a.name&&(t=!0,a.id=e.id)}),console.log("updatePerson()"),t&&window.confirm("Henkil\xf6 on jo olemassa. Haluatko p\xe4ivitt\xe4\xe4 henkil\xf6n tiedot?")?f.update(a).then(function(e){n.setState({newName:"",newNumber:""}),console.log("axios put response update",e),n.setState({persons:n.state.persons.map(function(e){return e.name===a.name&&(e.number=a.number),e})}),console.log("addPerson() this.state.persons",n.state.persons)}).catch(function(e){n.setState({error:"P\xe4ivitett\xe4v\xe4\xe4 henkil\xf6\xe4 ei l\xf6ytynyt en\xe4\xe4 tietokannasta 404 NOT FOUND. Lis\xe4t\xe4\xe4n henkil\xf6 uudestaan tietokantaan."}),f.create(a).then(function(e){n.setState({newName:"",newNumber:""}),console.log("axios post response create",e);var t={name:e.data.name,number:e.data.number,id:e.data.id};console.log("KASFAFSA"),n.setState({persons:n.state.persons.filter(function(e){return e.name!=t.name})}),n.setState({persons:n.state.persons.concat(t)})}).catch(function(e){n.setState({error:"Jotain meni pieleen. Henkil\xf6tietoa ei pystytty luomaan."}),setTimeout(function(){n.setState({error:null})},5e3)}),setTimeout(function(){n.setState({error:null})},5e3)}):f.create(a).then(function(e){n.setState({newName:"",newNumber:""}),console.log("axios post response create",e);var t={name:a.name,number:e.data.number,id:e.data.id};n.setState({persons:n.state.persons.concat(t)})}).catch(function(e){n.setState({error:e.response.data.error}),setTimeout(function(){n.setState({error:null})},5e3)})},n.deletePerson=function(e){window.confirm("Do you really want to remove this person?")&&f.remove(e).then(function(t){console.log("deletePerson response",t),n.setState({persons:n.state.persons.filter(function(t){return t.id!==e})})}).catch(function(e){n.setState({error:"Henkil\xf6\xe4 ei l\xf6ytynyt tietokannasta"}),setTimeout(function(){n.setState({error:null})},5e3)})},n.handleChanges=function(e){"newName"===e.target.name?n.setState({newName:e.target.value}):"newNumber"===e.target.name?n.setState({newNumber:e.target.value}):n.setState({filter:e.target.value})},n.toggleVisible=function(){n.setState({showAll:!n.state.showAll})},n.state={persons:[],filtteroi:[],newName:"",newNumber:"",filter:"",error:null},n}return Object(m.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this;f.getAll().then(function(t){console.log("axios get response",t);var n=t.data.map(function(e){return e});console.log("mapattuPersons",n),e.setState({persons:n}),e.setState({filtteroi:n})}).catch(function(t){e.setState({error:"Tietokantaan ei saatu yhteytt\xe4 404 NOT FOUND"}),setTimeout(function(){e.setState({error:null})},5e3)})}},{key:"render",value:function(){var e=this,t=this.state.persons.filter(function(t){return t.name.startsWith(e.state.filter)});return r.a.createElement("div",null,r.a.createElement("h1",null,"Puhelinluettelo"),r.a.createElement("label",null,"rajaa n\xe4ytett\xe4vi\xe4 "),r.a.createElement(w,{name:"filter",value:this.state.filter,onChange:this.handleChanges,persons:this.state.persons}),r.a.createElement("h1",null,"Lis\xe4\xe4 uusi"),r.a.createElement(E,{message:this.state.error}),r.a.createElement("form",{onSubmit:this.addPerson},r.a.createElement("label",null,"nimi: "),r.a.createElement("input",{name:"newName",value:this.state.newName,onChange:this.handleChanges}),r.a.createElement("br",null),r.a.createElement("label",null,"numero: "),r.a.createElement("input",{name:"newNumber",value:this.state.newNumber,onChange:this.handleChanges}),r.a.createElement("br",null),r.a.createElement("button",{type:"submit"},"tallenna")),r.a.createElement("h1",null,"Numerot"),r.a.createElement("ul",null,t.map(function(t){return r.a.createElement(b,{key:t.id,id:t.id,name:t.name,number:t.number,onClick:function(){return e.deletePerson(t.id)}})})))}}]),t}(r.a.Component)),w=function(e){return r.a.createElement("div",null,r.a.createElement("input",{name:e.name,value:e.value,onChange:e.onChange}))},E=function(e){var t=e.message;return null===t?null:r.a.createElement("div",{className:"error"},t)},S=g;s.a.render(r.a.createElement(S,{notes:[{id:1,content:"HTML on helppoa",date:"2017-12-10T17:30:31.098Z",important:!0},{id:2,content:"Selain pystyy suorittamaan vain javascripti\xe4",date:"2017-12-10T18:39:34.091Z",important:!1},{id:3,content:"HTTP-protokollan t\xe4rkeimm\xe4t metodit ovat GET ja POST",date:"2017-12-10T19:20:14.298Z",important:!0}]}),document.getElementById("root"))}},[[16,2,1]]]);
//# sourceMappingURL=main.59cc27e6.chunk.js.map