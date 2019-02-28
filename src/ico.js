import React, {Component} from 'react';
import './App.css';

class Ico extends Component {
	render() {
		var index = this.props.index;
		var item = this.props.item[1];
		var fieldOfWork = typeof item['Obory_cinnosti'] === 'undefined' ? '' : item['Obory_cinnosti']['Obor_cinnosti']['Text'];
		return (
			<div className={'content container'}>

				<ul className={"list-group"} key={'list'}>
					<h4 className={'list-group-item active list-group-item-heading'}>Obchodni firma:</h4>
					<li className={'list-group-item'} key={index + 1}>
						{item['Obchodni_firma']}
					</li>
					<h4 className={'list-group-item active list-group-item-heading'}>ICO:</h4>
					<li className={'list-group-item'} key={index + 2}>
						{item['ICO']}
					</li>
					<h4 className={'list-group-item active list-group-item-heading'}>Datum vzniku:</h4>
					<li className={'list-group-item'} key={index + 3}>
						{item['Datum_vzniku']}
					</li>
					<h4 className={'list-group-item active list-group-item-heading'}>Cislo ulice:</h4>
					<li className={'list-group-item'} key={index + 4}>
						{item['Adresa_dorucovaci']['Ulice_cislo']}
					</li>
					<h4 className={'list-group-item active list-group-item-heading'}>PSC:</h4>
					<li className={'list-group-item'} key={index + 5}>
						{item['Adresa_dorucovaci']['PSC_obec']}
					</li>
					<h4 className={'list-group-item active list-group-item-heading'}>Obor cinnosti:</h4>
					<li className={'list-group-item'} key={index + 6}>
						{fieldOfWork}
					</li>
				</ul>
			</div>
		)
	}

}

export default Ico;