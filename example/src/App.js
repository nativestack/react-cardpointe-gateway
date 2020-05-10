import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'

import { NativeStackTokenizer } from 'react-cardpointe-gateway'
import 'react-cardpointe-gateway/dist/index.css'

class App extends Component {
	constructor(props) {
		super(props)
		// NOTE: Parent must have emvData object
		this.state = {
			emvData: ''
		}
	}

	componentDidUpdate() {
		console.log('This is the TokenData: ', this.state.emvData)

		/* NOTE: This is the function passed into props
		 *
		 *       This will send token data back to Parent component
		 *
		 *       @return {token: "9418594164541111", expiryDate: "202312"}
		 */
		/*
			Use this function if you will embed this component as a child into
			a parent component so you can recursively send the emvData in state
			back up into the parent component where this component will reside.
				try {
					this.props.tokenProps.userEmvData(this.state.emvData)
				} catch (err) {
					console.log('UPDATING CARD')
				}
		*/
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
			userEmvData: this.userEmvData
		}

		/*
		 * NOTE: User has to pass tokenProps into props
		 *       for child component to allow this to access
		 *       the function in parent component.
		 */

		return (
			<Container className='payments'>
				{/* Start Form for step 1 here!! */}
				{/* onSubmit={ this.handleSubmit } */}
				<Form className='form-renewals' method='post'>
					{/* This is the Number FG */}
					<Form.Group
						controlId='tokenEvent'
						className='billing-group'
					>
						<NativeStackTokenizer
							site='fts'
							port='6443'
							tokenProps={tokenProps}
						/>
					</Form.Group>
				</Form>
			</Container>
		)
	}
}

export default App
