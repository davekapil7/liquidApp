import { IMG } from "./image"

export const Logintab = [
    {
        id :1,
        title : "Register Account",
        iconname :""
    }
]

export const tabbar = [
    {
        id : 1,
        title : "ADD",
        activename : "plussquare",
        activetype : 'antdesign',
        inactivename : "plus",
        inactivetype : "antdesign",
        nav : 'Addscreen'

    },
    {
        id : 2,
        title : "WALLET",
        activename : "wallet",
        activetype : 'ionicon',
        inactivename : "wallet-outline",
        inactivetype : "ionicon",
        nav:"Walletscreen"

    },
    {
        id : 3,
        title : "CONTACTS",
        activename : "user",
        activetype : 'font-awesome',
        inactivename : "user-o",
        inactivetype : "font-awesome",
        nav:"Contactscreen"

    },
    {
        id : 4,
        title : "SERVICES",
        activename : "briefcase-variant",
        activetype : 'material-community',
        inactivename : "briefcase-variant-outline",
        inactivetype : "material-community",
        nav:"Servicescreen"

    },
]

export const wallettype = [
    {
        id : 0,
        title : "All",
        iname : 'appstore-o',
        itype : "antdesign"
    },
    {
        id : 1,
        title : "Certificates"
    },
    {
        id :2,
        title : "Testimonials"
    },
    {
        id : 3,
        title : "Professional"
    },
]
export const Onbording = [
    {
        id : 1,
        title : "Introducing the LIQID Wallet",
        img : IMG.ONBORDING,
        desc : "You have now taken the first step to being in control of your personal data and identities.",
        
    },
    {
        id : 2,
        title : "Creating a connection",
        img : IMG.ONBORDING,
        desc : "Connect with organisations you trust to receive and share credentials securely.",
    },
    {
        id : 3,
        title : "Credential offers",
        img : IMG.ONBORDING,
        desc : "All new Credential offers will be listed under Actions.",
        desc2 : "You need to click and Accept before a credential is stored in your LIQID wallet."
    },
    {
        id : 4,
        title : "Verification Request",
        img : IMG.ONBORDING,
        desc : "When an organisation want you to share data they will send a Verification request. Review the request and Accept or Decline.  You are in control!",
        desc2 : "That's all for now. Go ahead and explore the LIQUID Ecosystem!"
    },
]