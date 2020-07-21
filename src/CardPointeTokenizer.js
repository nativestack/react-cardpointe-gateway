import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import styles from './styles.module.css'

export default class CardPointeTokenizer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			emvToken: '',
			expiryDate: ''
		}
	}

	handleTokenEvent = (event) => {
		window.addEventListener(
			'message',
			(event) => {
				const token = JSON.parse(event.data)
				let mytoken = document.getElementById('mytoken')

				mytoken.value = token.message
				const expField = token.expiry

				const tkn = mytoken.value
				const dte = expField

				this.setState({
					emvToken: tkn,
					expiryDate: dte
				})

				const emvData = {
					token: tkn,
					expiryDate: dte
				}

				this.props.tokenProps.userEmvData(emvData)
				event.preventDefault()
			},
			false
		)
	}

	renderTokenizerUi() {
		const url = `https://${this.props.site}.cardconnect.com:${this.props.port}/itoke/ajax-tokenizer.html`
		// #ccnumfield #cccvvfield #ccexpiryyear #ccexpirymonth {}
		const cssStyle =
			'css=.error{color:red;border-color:red;}label{font-family:sans-serif;font-size:12px;}input{height:18px;font-size:16px;}body{margin:0px;height:100%}select{height:18px;}'

		const params = new URLSearchParams({
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
		})

		const iFrameUrl = url + '?' + params + '&' + encodeURI(cssStyle)

		return (
			<Container className={styles.native_stack_payments}>
				{/* Start Form for step 1 here!! */}
				{/* onSubmit={ this.handleSubmit } */}
				<Form
					className='form-renewals'
					name='order'
					method='post'
					id='tokenform'
				>
					{/* This is the Number FG */}
					<Form.Group
						controlId='tokenEvent'
						className={styles.billing_group}
					>
						<iframe
							title='CardPointeTokenizer'
							id='tokenframe'
							name='tokenframe'
							src={iFrameUrl}
							frameBorder='0'
							scrolling='no'
							width='100%'
							height='100%'
							onLoad={this.handleTokenEvent}
						>
							<input type='hidden' name='token' id='mytoken' />
						</iframe>
					</Form.Group>
				</Form>
			</Container>
		)
	}

	// NOTE: This is being used to get the correct workflow step
	// to render. You have to setState outside of the render
	// "canvas".
	renderForms() {
		const form = this.renderTokenizerUi()
		return form
	}

	render() {
		return (
			<div className='cardpointe-tokenizer-view'>
				{this.renderForms()}
			</div>
		)
	}
}
