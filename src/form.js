import React, {Component} from 'react';
import './App.css';
import Ico from "./ico";
import Name from "./name";

class Form extends Component {
	constructor(props) {
		super(props);
		this.state = { name: '', number: '', content: [], isLoading: false, failed: false };

		this.handleChange = this.handleChange.bind(this);
		this.handleChangeNumber = this.handleChangeNumber.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevState.failed) {
			this.setState({ failed: false });
		}
	}

	handleChange(event) {
		this.setState({ name: event.target.value });
	}

	handleChangeNumber(event) {
		this.setState({ number: event.target.value });
	}

	handleSubmit(event) {
		this.setState({ isLoading: true });

		fetch('http://ares.localhost/show', {
			method: "POST",
			cache: "no-cache",
			credentials: "same-origin",
			headers: {
				'Accept': 'application/json',
				"Content-Type": "application/json",
			},
			redirect: "follow",
			referrer: "no-referrer",
			body: JSON.stringify({ 'name': this.state.name, 'ico': this.state.number }),
		}).then(
			response => {
				response.json()
					.then(json => {
						this.setState({
							content: [json],
							isLoading: false
						});
					});
			}
		)
			.catch(error => {
				this.setState({
					failed: true,
					isLoading: false
				});
				console.error('Error:', error)
			});

		event.preventDefault();
	}

	render() {
		if (this.state.isLoading) {
			return (
				<div className={'center lds-circle'}>
					<div />
				</div>
			);
		} else {
			if (this.state.failed) {
				var failed = <p className={'content-small alert alert-danger'} key={'warning'}>Načítání dat selhalo</p>;
			}
			return (
				<div className={'container form'}>
					{failed}
					<form onSubmit={this.handleSubmit} className={'form-inline'}>
						<div className={'input-group'}>
							<input type={'number'}
								className={'form-control'}
								name={'ico'}
								value={this.state.number}
								onChange={this.handleChangeNumber}
								placeholder={'IČO'}
								min={'0'}
							/>
						</div>
						<div className={'input-group'}>
							<input type={'text'}
								className={'form-control'}
								name={'name'}
								value={this.state.name}
								onChange={this.handleChange}
								placeholder={'Jméno'}
							/>
						</div>
						<div className={'input-group'}>
							<input type={'submit'} className={'btn btn-default'} value={'Vyhledat'} />
						</div>
					</form>
					<div>
						{
							this.state.content
								.map((item, index) => {
										if (item[0] === 'ico') {
											return <Ico item={item} index={index} key={index} />;
										} else if (item[0] === 'name' && !item[1].hasOwnProperty('length')) {
											return <Name item={item} index={index} key={index} grid={true} />;
										} else {
											return <p className={'content-small alert alert-danger'} key={'warning'}>Záznam nebyl nalezen</p>;
										}
									}
								)
						}
					</div>
				</div>
			);
		}
	}

}

export default Form;