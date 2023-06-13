import {IMG} from './image';

export const Logintab = [
  {
    id: 1,
    title: 'Register Account',
    iconname: '',
  },
];

export const tabbar = [
  {
    id: 1,
    title: 'ADD',
    activename: 'plussquare',
    activetype: 'antdesign',
    inactivename: 'plus',
    inactivetype: 'antdesign',
    nav: 'Addscreen',
  },
  {
    id: 2,
    title: 'WALLET',
    activename: 'wallet',
    activetype: 'ionicon',
    inactivename: 'wallet-outline',
    inactivetype: 'ionicon',
    nav: 'Walletscreen',
  },
  {
    id: 3,
    title: 'CONTACTS',
    activename: 'user',
    activetype: 'font-awesome',
    inactivename: 'user-o',
    inactivetype: 'font-awesome',
    nav: 'Contactscreen',
  },
  {
    id: 4,
    title: 'SERVICES',
    activename: 'briefcase-variant',
    activetype: 'material-community',
    inactivename: 'briefcase-variant-outline',
    inactivetype: 'material-community',
    nav: 'Servicescreen',
  },
];

export const wallettype = [
  {
    id: 0,
    title: 'All',
    iname: 'appstore-o',
    itype: 'antdesign',
  },
  {
    id: 1,
    title: 'Certificates',
    iname: 'appstore-o',
    itype: 'antdesign',
  },
  {
    id: 2,
    title: 'Credentials',
    iname: 'idcard',
    itype: 'antdesign',
  },
  {
    id: 3,
    title: 'Professional',
    iname: 'appstore-o',
    itype: 'antdesign',
  },
];
export const Onbording = [
  {
    id: 1,
    title: 'Introducing the LIQID Wallet',
    img: IMG.ONBORDING_1,
    desc: 'You have now taken the first step to being in control of your personal data and identities.',
  },
  {
    id: 2,
    title: 'Creating a connection',
    img: IMG.ONBORDING_2,
    desc: 'Connect with organisations you trust to receive and share credentials securely.',
  },
  {
    id: 3,
    title: 'Credential offers',
    img: IMG.ONBORDING_3,
    desc: 'All new Credential offers will be listed under Actions.',
    desc2:
      'You need to click and Accept before a credential is stored in your LIQID wallet.',
  },
  {
    id: 4,
    title: 'Verification Request',
    img: IMG.ONBORDING_4,
    desc: 'When an organisation want you to share data they will send a Verification request. Review the request and Accept or Decline.  You are in control!',
    desc2: "That's all for now. Go ahead and explore the LIQUID Ecosystem!",
  },
];

export const seetingjson = [
  {
    id: 1,
    title: 'Wallet Details',
    subitem: [
      {
        sid: 1,
        stitle: 'did:elem:EiAOBkaOV2keoR1c-AAAA',
        iname: 'copy',
        itype: 'feather',
        nav: 'copy',
      },
      {
        sid: 2,
        stitle: 'Access Recovery Phrase',
        iname: 'chevron-small-right',
        itype: 'entypo',
        nav: 'recovery',
      },
      {
        sid: 3,
        stitle: 'Wallet Connection Management',
        iname: 'chevron-small-right',
        itype: 'entypo',
        nav: 'wallet',
      },
      {
        sid: 4,
        stitle: 'Delete My Wallet',
        iname: 'delete',
        itype: 'antdesign',
        nav: 'delete',
      },
      {
        sid: 5,
        stitle: 'Logout',
        iname: 'delete',
        itype: 'antdesign',
        nav: 'logout',
      },
    ],
  },
  {
    id: 2,
    title: 'Email Addresses',
    add: true,
    subitem: [
      {
        sid: 1,
        stitle: 'user@gmail.com',
        iname: null,
      },
    ],
  },
  {
    id: 3,
    title: 'Security Settings',
    subitem: [
      {
        sid: 1,
        stitle: 'Wallet Access Pin',
        iname: 'edit',
        itype: 'antdesign',
        nav: 'Walletpin',
      },
      {
        sid: 2,
        stitle: 'Touch ID',
        iname: null,
        toggle: true,
      },
    ],
  },
  {
    id: 4,
    title: 'Backup Wallet',

    subitem: [
      {
        sid: 1,
        stitle: 'Enable credential backup',
        sdesc: 'NOT CONNECTED',
        iname: null,
        toggle: true,
      },
      {
        sid: 2,
        stitle: 'RECOVER CREDENTIALS',
        iname: null,
        nav: 'recover',
      },
    ],
  },
  {
    id: 4,
    title: 'About ceal',
    subitem: [
      {
        sid: 1,
        stitle: 'Frequently Asked Questions (FAQs)',
        iname: null,
      },
      {
        sid: 2,
        stitle: 'Terms and Conditions',
        iname: null,
      },
      {
        sid: 3,
        stitle: 'Privacy Policy',
        iname: null,
      },
      {
        sid: 4,
        stitle: 'Report a problem',
        iname: null,
      },
      {
        sid: 5,
        stitle: 'Provide Feedback',
        iname: null,
      },
      {
        sid: 6,
        stitle: 'VERSION 3.31.0',
        iname: null,
      },
    ],
  },
];

export const number = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
  {
    id: 6,
  },
  {
    id: 7,
  },
  {
    id: 8,
  },
  {
    id: 9,
  },
  {
    id: null,
  },
  {
    id: 0,
  },
  {
    id: 'return',
  },
];

export const proof = [
  {
    id: 1,
    cname: 'Liquid',
    kerryid: 1235698,
    memberdata: '26/12/2022',
    issurancedate: '12/15/2012',
  },
  {
    id: 1,
    cname: 'Liquid',
    kerryid: 1235698,
    memberdata: '26/12/2022',
    issurancedate: '12/15/2012',
  },
  {
    id: 2,
    cname: 'Liquid2',
    kerryid: 1235698,
    memberdata: '26/12/2022',
    issurancedate: '12/15/2012',
  },
  {
    id: 3,
    cname: 'Liquid3',
    kerryid: 1235698,
    memberdata: '26/12/2022',
    issurancedate: '12/15/2012',
  },
  {
    id: 4,
    cname: 'Liquid4',
    kerryid: 1235698,
    memberdata: '26/12/2022',
    issurancedate: '12/15/2012',
  },
];
