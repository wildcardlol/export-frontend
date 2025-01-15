import logo from '../public/logo.png';
import { base } from "viem/chains";

const getConfig = ({ emailSupported }) => {
    const loginMethodsAndOrder = emailSupported ? {
        "primary": ["email", "farcaster"],
        // "overflow": ["farcaster"],
    } : {
        "primary": ["farcaster"],
    };
    return {
        "defaultChain": base,
        "supportedChains": [base],
        "appearance": {
            "accentColor": "#b4f6a6",
            "theme": "#222224",
            "showWalletLoginFirst": false,
            "logo": logo
        },
        "loginMethodsAndOrder": loginMethodsAndOrder,
        "embeddedWallets": { "createOnLogin": "off", "requireUserPasswordOnCreate": false },
        "mfa": { "noPromptOnMfaRequired": false }
    }
};

export default getConfig;
