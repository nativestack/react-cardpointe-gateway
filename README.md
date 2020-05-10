# CardPointe Gateway Tokenizer for React.js

**Authored By: [NativeStack Engineering](https://www.upwork.com/ag/nativestack/)**

## Product Under Development and Being Tested

We are working with CardConnect to provide a fully customizeable and PCI compliant solution for modern web frameworks. We did not expect this package to be as popular as it turned out to be. We are still testing the features in this package and working to make it compatible across as many different platforms as possible. Please contact us at **(628) 400 2701** or email us at **Support@NativeStack.io** for help implementing this service into your project until we have ths package ready.

### Changelog & Updates

-   Sunday 10 May 2020: Full hosted iFrame react component is working with a working example application `</App>`. Needs additional props to set additional CardPointe Hosted iFrame Configurations. The component returns a **token** and an **expiration date**.
-   Initial deployments not working or tested.

CardConnect's CardPointe Hosted iFrame Tokenizer & PCI Compliant CardSecure tokenization package to securely authorize & capture transactions with NativeStack & CardPointe for React.js applications.

## Installation

`npm install react-cardpointe-gateway`

### Implementation

This module requires [`react-bootstrap` v^1.0.0-beta.12 as a _peer dependancy_](https://react-bootstrap.netlify.app). You can install the version needed after reviewing the doc with:

`npm install react-bootstrap@1.0.0-beta.12`

In the example `<App />` included in the package we first implement the following imports:

```
import NativeStackTokenizer from 'react-cardpointe-gateway'
```

In the `constructor` of the parent component with the implementation of the component, declare a state attribute as such:

```
constructor(props) {
	super(props);
    this.state = {
    	emvData: ""
    };
}
```

Next implement a `componentDidUpdate()` function as such, IF & ONLY IF you will are nesting this implementation into a parent component that needs to process the token in state. You will need to recursively pass the `userEmvData()` function and the assoicated `tokenProps` object as shown below to recursively pass the value up through `props` and into the state of its parent component.

```
componentDidUpdate() {
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
				console.log('This is your NativeStackToken: ', this.state.emvData)
			}
	*/
}
```

Next, implement this function in your parent component where this component will be nested to be used by the `react-cardpointe-gateway` tokenizer. This needs to go in the same file where you will call this component from.

```
/* NOTE:
 * @function userEmvData
 * @param emvData
 * Parent component must implement function
 * to pass emvData returned from child into
 * state.
 */
userEmvData = (emvData) => {
	this.setState({
		emvData: emvData,
	});
};
```

The `render` function in your parent component needs to declare a `tokenProps` object that will be used to pass the token data needed by the payment gateway to authorize and capture a transaction with any credit card securely and in compliance with PCI. You will need this tokenized `emvData` to make your `/auth` and `/capture` API calls to [**CardPoint's CardConnect API**](https://developer.cardconnect.com/cardconnect-api) to capture your transactions after securely tokenizing your user's credit card with an implementation like the example below:

```
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
	};
	/*
	* NOTE: User has to pass tokenProps into props
	*       for child component to allow this to access
	*       the function in parent component.
	*/
	return (
		<div className='native-stack-payments'>

			<NativeStackTokenizer
				site='fts'
				port='6443'
				tokenProps={tokenProps}
			/>
		</div>
	);
}
```

### License

**IPA**

**Contact: Support@NativeStack.io**

#### Keywords

payments, merchant-account, emv-token, react, card-pointe, native-stack, card-secure, card-connect, credit-cards, pci-compliant
