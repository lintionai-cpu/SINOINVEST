// auth.js

const ADMIN_EMAIL = "drixpro25@gmail.com"; // your fixed admin email


async function handleSignup() {
    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value.trim();
    const phone = document.getElementById("signup-phone").value.trim();
    const message = document.getElementById("signup-message");

    message.textContent = ""; // Clear previous messages

    if (email === ADMIN_EMAIL) {
        message.textContent = "You cannot create the admin account here.";
        return;
    }

    try {
        // Create client account in Firebase Auth
        const cred = await auth.createUserWithEmailAndPassword(email, password);
        const uid = cred.user.uid;

        // Store additional client info in Firestore
        await db.collection("client").doc(uid).set({
            uid,
            role: "client",
            name,
            email,
            phone,
            portfolioValue: 0,
            cashBalance: 0,
            dailyChange: 0,
            stocks: [],
            crypto: [],
            realEstate: [],
            withdrawStatus: "none",
            paymentStatus: "unpaid",
            transactionHistory: [],
            createdAt: new Date().toISOString()
        });

        // Redirect to client dashboard
        window.location.href = "public/client/index.html";

    } catch (err) {
        console.error("Signup failed:", err);
        message.textContent = err.message;
    }
}


function handleLogin() {
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();
    const message = document.getElementById("login-message");

    auth.signInWithEmailAndPassword(email, password)
        .then((cred) => {
            const user = cred.user;

            if (email === ADMIN_EMAIL) {
                // Admin: no Firestore role check
                window.location.href = "public/admin/index.html";
            } else {
                // Clients only
                return db.collection("roles").doc(user.uid).get().then((doc) => {
                    if (!doc.exists || doc.data().role !== "client") {
                        throw new Error("Access denied: not a client.");
                    }
                    window.location.href = "login.html";
                });
            }
        })
        .catch((err) => {
            message.textContent = err.message;
        });
}