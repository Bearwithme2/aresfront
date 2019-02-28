import React, {Component} from 'react';
import './App.css';
import Form from "./form";

class App extends Component {
	render() {
		return (
			<div>
				<h1 className={'container-fluid h1'}>
					<a href={'/'}>Ares</a>
				</h1>
				<Form />
			</div>
		);
	}
}

export default App;
