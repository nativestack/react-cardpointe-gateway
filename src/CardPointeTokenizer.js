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
			},
			false
		)
	}

	renderTokenizerUi() {
		const url = `https://${this.props.site}.cardconnect.com:${this.props.port}/itoke/ajax-tokenizer.html`
		// #ccnumfield #cccvvfield #ccexpiryyear #ccexpirymonth {}
		// &input{font-size:18px;height:21px;padding:10px;line-height:1.5;border-radius:3px; color:#495057;background-color:#fff;background-clip:padding-box;border:1pxsolid#ced4da;overflow:visible;margin:0;font-family:'Open+Sans','Segoe+UI','DejaVu+Sans','sans-serif';-webkit-appearance:textfield;}
		const cssStyle =
			'?css=.error{color:red;border-color:red;}input{font-size:18px;height:22px;border-radius:3px;margin-bottom:20px;}select{height:55px;}label{font-family:sans-serif;}'

		const params = new URLSearchParams({
			maskfirsttwo: this.props.tokenProps.maskfirsttwo,
			useexpiry: this.props.tokenProps.useexpiry,
			usemonthnames: this.props.tokenProps.usemonthnames,
			usecvv: this.props.tokenProps.usecvv,
			cardnumbernumericonly: this.props.tokenProps.cardnumbernumericonly,
			orientation: this.props.tokenProps.orientation,
			invalidinputevent: this.props.tokenProps.invalidinputevent,
			tokenizewheninactive: this.props.tokenProps.tokenizewheninactive,
			enhancedresponse: this.props.tokenProps.enhancedresponse,
			formatinput: this.props.tokenProps.formatinput
		})

		const iFrameUrl = url + encodeURI(cssStyle) + '&' + params

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
