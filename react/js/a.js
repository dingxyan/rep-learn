
var name = "123";
var Hello = React.createClass({
	propTypes: {
		name: React.PropTypes.number
	},
	getDefaultProps: function() {
	    return {
	    	// name: 'Runoob'
	    };
	},
	render: function(){
		return <div>hello{this.props.name}</div>;
	}
});
ReactDOM.render(
	<Hello  name={name} />,
	document.getElementById("root")
);