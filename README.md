# CardPointe Gateway Tokenizer for React.js

**Authored By: [NativeStack Engineering](https://www.upwork.com/ag/nativestack/)**

## Product Under Development and Not Live

We are working with CardConnect to provide a fully customizeable and PCI compliant solution for modern web frameworks. We did not expect this package to be as popular as it turned out to be. We are still testing the features in this package and working to make it compatible across as many different platforms as possible. Please contact us at **(628) 400 2701** or email us at **Support@NativeStack.io** for help implementing this service into your project until we have ths package ready.

CardConnect's CardPointe Hosted iFrame Tokenizer & PCI Compliant CardSecure tokenization package to securely authorize & capture transactions with NativeStack & CardPointe for React.js applications.

## Installation

`npm install react-cardpointe-gateway`

### Implementation

In the `constructor` of the parent component with the implementation of the component, declare a state attribute as such:

```
constructor(props) {
	super(props);

    this.state = {
    	emvData: ""
    };
}
```

Next implement a `componentDidUpdate()` function as such:

```
componentDidUpdate() {
	console.log("This is the TokenData: ", this.state.emvData);
	/* NOTE: This is the function passed into props
 	 *
 	 *       This will send token data back to Parent component
 	 *
 	 *       @return {token: "9418594164541111", expiryDate: "202312"}
 	 */
	try {
		this.props.tokenProps.userEmvData(this.state.emvData);
	} catch (err) {
		console.log("UPDATING CARD");
	}
}
```

Next, implement this function in your parent component to be used by the `react-cardpointe-gateway` tokenizer. This needs to go in the same file where you will call your component from.

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

The `render` function in your parent component needs to declare an object that will be used to pass the authentication data needed by the payment gateway to tokenize any credit card securely and in compliance with PCI with an implementation like the example below:

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
		<div className="App">
			<NativeStackTokenizer
				site="fts-uat"
				port="6443"
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
