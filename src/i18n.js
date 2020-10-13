import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(LanguageDetector).init({
    // we init with resources
    resources: {
        en: {
           
                translations: {
                    pan: "PAN",
                    amount: "Tran Amount",
                    pin: "PIN",
                    expDate: "Expiration Date",
                    success: "Successful transaction",
                    failure: "Transaction failed",
                    submit: "Submit",
                    name: "Sahil Wallet",
                    language: "English / العربية",
                    cancel: "Cancel Transaction"

                
            }
        },
        ar: {
            translations: {
                pan: "رقم البطاقة",
                pin: "الرقم السري",
                expDate: "تاريخ انتهاء البطاقة",
                success: "معاملة ناجحة",
                failure: "المعاملة فشلت",
                amount: "قيمة المعاملة",
                submit: "تنفيذ المعاملة",
                name: "Sahil Wallet",
                language: "English / العربية",
                cancel: "الغاء المعاملة"
            }
        },




    },
    fallbackLng: "en",
    debug: true,

    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false, // we use content as keys

    react: {
        wait: true
    }
});

export default i18n;