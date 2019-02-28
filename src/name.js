import React, {Component} from 'react';
import Grid from 'react-data-grid';
import Ico from "./ico";
import './App.css';

class Name extends Component {

	constructor(props) {
		super(props);
		var item = props.item[1];
		var row = Object.keys(props.item[1]).map(key => item[key]);
		this.columns = [
			{ key: 'ico', name: 'IČO', sortable: 'true' },
			{ key: 'ojm', name: 'Obchodní firma', sortable: 'true' },
			{ key: 'jmn', name: 'Adresa firmy', sortable: 'true' }
		];

		this.state = { rows: row, columns: this.columns, content: [], grid: props.grid, isLoading: false, failed: false };
		this.handleSubmit = this.handleSubmit.bind(this);
		this.getCellActions = this.getCellActions.bind(this);
		this.sortGrid = this.sortGrid.bind(this);
	}

	componentDidMount() {
		this.setState({ grid: true });
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevState.failed) {
			this.setState({ failed: false });
		}
	}

	handleSubmit(ico) {
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
			body: JSON.stringify({ 'ico': ico }),
		}).then(
			response => {
				response.json()
					.then(json => {
						this.setState({ content: <Ico item={json} index={'0'} />, grid: false, isLoading: false });
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
	}

	getCellActions(column, row) {
		const cellActions = {
			ico: [{
				icon: <span className="glyphicon glyphicon-play" />, callback: () => {
					this.handleSubmit(row.ico)
				}
			}]
		};
		return cellActions[column.key];
	}

	sortGrid(column, order) {
		this.setState({
			rows: this.state.rows.sort((a, b) => {
				if (order === "ASC") {
					return a[column] > b[column] ? 1 : -1;
				} else if (order === "DESC") {
					return a[column] < b[column] ? 1 : -1;
				} else {
					return 0;
				}
			})
		});
		return this.state.rows;
	}

	render() {
		const { rows, columns } = this.state;
		if (this.state.grid === true) {
			let loader = !this.state.isLoading ? '' :
				<div className={'center lds-circle'}>
					<div />
				</div>;
			if (this.state.failed) {
				var failed = <p className={'content-small alert alert-danger'} key={'warning'}>Načítání dat selhalo</p>;
			}
			return (
				<div>
					{failed}

					<Grid
						columns={columns}
						rowGetter={i => rows[i]}
						rowsCount={this.state.rows.length}
						getCellActions={this.getCellActions}
						minHeight={800}
						onGridSort={(column, order) => {
							this.sortGrid(column, order)
						}}

					/>
					{loader}
				</div>
			)
		} else {
			return this.state.content;
		}

	}

}

export default Name;