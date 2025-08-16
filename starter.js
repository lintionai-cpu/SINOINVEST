import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

window.registerUser = async function(e) {
    e.preventDefault();

    // Step 1 fields
    const fullName = document.getElementById("fullName").value.trim();
    const dob = document.getElementById("dob").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value.trim();

    // Step 2 fields
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const city = document.getElementById("city").value.trim();
    const country = document.getElementById("country").value.trim();

    // Step 3 fields
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value;
    let paymentDetails = {};

    if (paymentMethod === "bank") {
        paymentDetails = {
            bankName: "Chase Bank",
            bankAccount: "1234567890",
            bankSwift: "CHASUS33",
            senderAccountName: document.getElementById("senderAccountName").value.trim(),
            senderAccountNumber: document.getElementById("senderAccountNumber").value.trim(),
            transactionRef: document.getElementById("transactionRef").value.trim(),
        };
    } else if (paymentMethod === "crypto") {
        paymentDetails = {
            BTC: "1FzWLkB6PqWqN8yPbK3zDdJ6hF6K1EzVQn",
            ETH: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
            USDT_TRC20: "TX6tF7dC4keD2v4hMZ4Z2L7JkMCrvbdXqr",
            senderWallet: document.getElementById("senderWallet").value.trim(),
            network: document.getElementById("network").value.trim(),
            transactionHash: document.getElementById("transactionHash").value.trim(),
        };
    }

    // Validation
    if (!fullName || !dob || !email || !password || !phone || !address || !city || !country || !paymentMethod) {
        showToast("Please fill all required fields", "bg-red-500");
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
            fullName,
            dob,
            email,
            phone,
            address,
            city,
            country,
            paymentMethod,
            paymentDetails,
            createdAt: new Date().toISOString()
        });

        showToast("Registration successful!", "bg-green-500");

        setTimeout(() => {
            window.location.href = "login.html";
        }, 2000);
    } catch (error) {
        showToast(error.message, "bg-red-500");
    }
};

window.showToast = function(message, colorClass) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.className = `fixed bottom-5 right-5 px-4 py-2 rounded-lg text-white ${colorClass} opacity-100 transition`;
    setTimeout(() => {
        toast.className += " opacity-0";
    }, 2000);
};