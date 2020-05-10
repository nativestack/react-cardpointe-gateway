# CardPointe Gateway Tokenizer for React.js

**Authored By: [NativeStack Engineering](https://www.upwork.com/ag/nativestack/)**

[CardConnect's CardPointe Hosted iFrame Tokenizer](https://developer.cardconnect.com/hosted-iframe-tokenizer) & PCI Compliant CardSecure tokenization package to securely authorize & capture transactions with NativeStack & CardPointe for React.js applications.

CardConnect's Hosted iFrame Tokenizer solution captures code (HTML, JavaScript, and Java) associated with a CardSecure token value of a credit number within an iFrame. Per the Payment Card Industry (PCI) Data Security Standards, a merchant's PCI compliance requirements are reduced when encasing token functionality in an iFrame hosted by CardSecure.

## Product in Testing

We are working with CardConnect to provide a fully customizeable and PCI compliant solution for modern web frameworks. We did not expect this package to be as popular as it turned out to be this early on. We are currently testing the features in this package and working to make it compatible across as many different frameworks as possible. Please contact us at **(628) 400 2701** or email us at **Support@NativeStack.io** for help implementing this service into your project until we have this package ready.

### Changelog & Updates

-   Sunday 10 May 2020 v1.4.4: [CardConnect Hosted iFrame **Optional Parameters**](https://developer.cardconnect.com/hosted-iframe-tokenizer#optional-parameters) can be passed into the component as `tokenProps` to append to the `url` used in the request to obtain the secure tokenizer. [See the complete list of Supported Optional Parameters](#supported-optional-parameters)
-   Sunday 10 May 2020 v1.4.2: Fully hosted iFrame react component is working with a working example application `</App>`. Needs additional props to set additional CardPointe Hosted iFrame Configurations. The component returns a **token** and an **expiration date**.
-   Saturday 9 May 2020: Initial deployments not working or tested.

## Installation

`npm install react-cardpointe-gateway`

## Implementation

This module requires [`react-bootstrap@v^1.0.0-beta.12` as a _peer dependancy_](https://react-bootstrap.netlify.app). You can install the version needed after reviewing the doc with:

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

Next implement a `componentDidUpdate()` function as such, IF & ONLY IF you are nesting this implementation into a parent component that needs to process the token in state. You will need to recursively pass the `userEmvData()` function and the assoicated `tokenProps` object as shown below to recursively pass the value up through `props` and into the state of its parent component.

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

The `render` function in your parent component needs to declare a `tokenProps` object that will be used to pass the token data needed by the payment gateway to authorize and capture a transaction with any credit card securely and in compliance with PCI. You will need this tokenized `emvData` to make your `/auth` and `/capture` API calls to [**CardPoint's CardConnect API**](https://developer.cardconnect.com/cardconnect-api) to capture your transactions after securely tokenizing your user's credit card with an implementation like the example below.

You must implement the [CardConnect Hosted iFrame Tokenizer](https://developer.cardconnect.com/hosted-iframe-tokenizer) options you want to support in your implementations of this component. Add the options to your `tokenProps` object as shown in the example below:

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
		maskfirsttwo: true,
		useexpiry: true,
		usemonthnames: true,
		usecvv: true,
		cardnumbernumericonly: true,
		orientation: 'horizontal',
		invalidinputevent: true,
		tokenizewheninactive: true,
		enhancedresponse: true,
		formatinput: true
	}

	/*
	* NOTE: User has to pass tokenProps into props
	*       for child component to allow this to access
	*       the function in parent component.
	*/

	return (
		<div className='native-stack-payments'>

			<NativeStackTokenizer
				site='fts-uat'
				port='6443'
				tokenProps={tokenProps}
			/>
		</div>
	);
}
```

### Supported Optional Parameters

| Parameter             |  Type  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| :-------------------- | :----: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| maskfirsttwo          |  bool  | If true, the first 2 digits of the card number are masked.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| useexpiry             |  bool  | If true, includes two drop-down selectors to specify the expiration month (MM) and Year (YYYY).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| usemonthnames         |  bool  | If true, displays Month names instead of numbers.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| usecvv                |  bool  | If true, includes a field to enter the Cardholder Verification Value (CVV). **Notes**: <ul> <li>If usecvv is true, the CVV must be provided to initiate the tokenization request.</li> <li>If CVV is not masked. This value remains in clear text. </li> </ul>                                                                                                                                                                                                                                                                                                                                                                                                           |
| cardnumbernumericonly |  bool  | If true, the card number field ignores non-numeric values.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| orientation           | string | Controls the orientation of the elements within the iFrame. **Supported values are**: <ul><li>default - the default orientation, used if no value is passed for this parameter.</li><li>horizontal</li><li>vertical</li><li>custom </li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                            |
| invalidinputevent     |  bool  | If true, a `message` event will be sent to the parent page when the iFrame determines that the card number is invalid (for example, if it fails the **luhn** check). The `data` property in the event will contain an empty string and a `validationError` property will contain a description of the validation failure. An example of how this event can be used is available at the following url: [https://fts-uat.cardconnect.com/itoke/outer-page-validation.html](https://fts-uat.cardconnect.com/itoke/outer-page-validation.html).                                                                                                                              |
| tokenizewheninactive  |  bool  | **Note**: This parameter should be used for mobile implementations. Validation and tokenization for manual input is normally performed when an onBlur event occurs on the input field (for example, when the user clicks/tabs to the next field in the form). If `tokenizewheninactive` is set to true, validation and tokenization will be performed once the input field stops receiving input from the user. This inactivity duration is configurable through the `inactivityto` parameter. Note that the onBlur event will not be used at all if `tokenizewheninactive` is set to true and that `inactivityto` is also used to determine when a swipe has completed. |
| enhancedresponse      |  bool  | If true, the following additional parameters will be included in the JSON response after a tokenization attempt: <ul><li> token - the token if tokenization was successful, otherwise an empty string</li><li>errorMessage - the error message from CardSecure on tokenization failure; otherwise, an empty string.</li><li> errorCode - one of the following:</li><ol><li>The error code from CardSecure on tokenization failure</li><li>A custom iFrame Tokenizer error code</li><li>'0' if no error occurred</li></ol></ul>                                                                                                                                           |
| formatinput           |  bool  | Styles the card number to be separated every four numbers so the number is easily read as the user types into the field.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

## Test the Example `</NativeStack Tokenizer>` Component

You can test the example `</App>` located in the `/example` directory of the package. You need to first `clone` the [repository](https://github.com/nativestack/react-cardpointe-gateway) and run the project to see the output locally as follows:

-   Step 1: `$ git clone git@github.com:nativestack/react-cardpointe-gateway.git`

-   Step 2: From the `root` directory of the package and `$ npm install` the project `dev-dependencies`.

-   Step 3: You need to install a `peer-dependancy` with `npm install react-bootstrap@1.0.0-beta.12`

-   Step 4: From the `root` project directory and `$npm start` the project.

-   Step 5: Open a second terminal, navigate into `$ cd react-cardpoint-gateway/example` and run `$ npm install`

-   Step 6: Proceed to `$ npm start` the example and open a browser to `localhost:3000` to see the PCI Compliant iFrame in action!

### Example Output PCI Compliant Tokenizer

![](https://github.com/nativestack/react-cardpointe-gateway/blob/master/img/react-cardpointe-gateway-example.png?raw=true)

## License

[**IPA**](https://opensource.org/licenses/IPA)

**Contact: Support@NativeStack.io**

### Keywords

payments, merchant-account, emv-token, react, card-pointe, native-stack, card-secure, card-connect, credit-cards, pci-compliant
