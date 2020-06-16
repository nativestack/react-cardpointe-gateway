import React, { Component } from 'react'
import styles from './styles.module.css'
import CardPointeTokenizer from './CardPointeTokenizer'

export default class NativeStackTokenizer extends Component {
	constructor(props) {
		super(props)
		// NOTE: Parent must have emvData object
		this.state = {
			emvData: ''
		}
	}

	componentDidUpdate() {
		//console.log('This is the TokenData: ', this.state.emvData)
		/* NOTE: This is the function passed into props
		 *
		 *       This will send token data back to Parent component
		 *
		 *       @return {token: "9418594164541111", expiryDate: "202312"}
		 */
		try {
			if (this.state.emvData.token.length === 16) {
				this.props.tokenProps.userEmvData(this.state.emvData)
			}
		} catch (err) {
			console.log('TOKENIZING CARD WITH NATIVESTACK ENGINEERING')
			console.log('This is your NativeStackToken: ', this.state.emvData)
		}
	}

	/* NOTE:
	 * @function userEmvData
	 * @param emvData
	 * Parent component must implement function
	 * to pass emvData returned from child into
	 * state.
	 */
	userEmvData = (emvData) => {
		this.setState({
			emvData: emvData
		})
	}

	render() {
		/* NOTE:
		 * @const tokenProps
		 * Parent component must declare tokenProps
		 * in render function to pass userEmvData
		 * function into child component props.
		 */
		const tokenProps = {
			// below is token info
			userEmvData: this.userEmvData,
			maskfirsttwo: this.props.tokenProps.maskfirsttwo,
			useexpiry: this.props.tokenProps.useexpiry,
			usemonthnames: this.props.tokenProps.usemonthnames,
			usecvv: this.props.tokenProps.usecvv,
			cardnumbernumericonly: this.props.tokenProps.cardnumbernumericonly,
			orientation: this.props.tokenProps.orientation,
			invalidinputevent: this.props.tokenProps.invalidinputevent,
			enhancedresponse: this.props.tokenProps.enhancedresponse,
			formatinput: this.props.tokenProps.formatinput,
			tokenizewheninactive: this.props.tokenProps.tokenizewheninactive,
			inactivityto: this.props.tokenProps.inactivityto
		}

		/*
		 * NOTE: User has to pass tokenProps into props
		 *       for child component to allow this to access
		 *       the function in parent component.
		 */
		return (
			<div className={styles.App}>
				<CardPointeTokenizer
					site={this.props.site}
					port={this.props.port}
					tokenProps={tokenProps}
				/>
			</div>
		)
	}
}
