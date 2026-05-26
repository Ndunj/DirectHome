import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userProperties, setUserProperties] = useState([]);
    const [registeredUsers, setRegisteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('directhome_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        const storedUsers = localStorage.getItem('directhome_registered_users');
        if (storedUsers) {
            setRegisteredUsers(JSON.parse(storedUsers));
        }

        const storedProps = localStorage.getItem('directhome_user_properties');
        if (storedProps) {
            setUserProperties(JSON.parse(storedProps));
        }

        setLoading(false);
    }, []);

    const login = (email, password) => {
        // Mock login
        const mockUser = {
            email,
            name: email.split('@')[0],
            role: 'buyer',
            propertyCount: 0,
            isPremium: false,
            favorites: []
        };
        setUser(mockUser);
        localStorage.setItem('directhome_user', JSON.stringify(mockUser));
        return true;
    };

    const signup = (userData) => {
        // Check if email already exists
        const emailExists = registeredUsers.some(u => u.email.toLowerCase() === userData.email.toLowerCase());
        if (emailExists) {
            return { success: false, message: "Email already registered. Please login instead." };
        }

        // Check password complexity
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
        if (!passwordRegex.test(userData.password)) {
            return {
                success: false,
                message: "Password must be 8+ chars, contain 1 Upper case and 1 special char."
            };
        }

        // Mock signup
        const newUser = { ...userData, role: 'buyer', propertyCount: 0, isPremium: false, favorites: [] };

        const updatedUsers = [...registeredUsers, newUser];
        setRegisteredUsers(updatedUsers);
        localStorage.setItem('directhome_registered_users', JSON.stringify(updatedUsers));

        setUser(newUser);
        localStorage.setItem('directhome_user', JSON.stringify(newUser));
        return { success: true };
    };

    const toggleFavorite = (propertyId) => {
        if (!user) return false;
        const favorites = user.favorites || [];
        const isFavorited = favorites.includes(propertyId);
        const updatedFavorites = isFavorited
            ? favorites.filter(id => id !== propertyId)
            : [...favorites, propertyId];

        const updatedUser = { ...user, favorites: updatedFavorites };
        setUser(updatedUser);
        localStorage.setItem('directhome_user', JSON.stringify(updatedUser));
        return true;
    };

    const subscribe = () => {
        if (user) {
            const updatedUser = { ...user, isPremium: true };
            setUser(updatedUser);
            localStorage.setItem('directhome_user', JSON.stringify(updatedUser));
            return true;
        }
        return false;
    };

    const addProperty = (propertyData) => {
        const newProperty = {
            ...propertyData,
            id: Date.now(), // Simple mock ID
            seller: {
                name: user?.name,
                email: user?.email
            },
            expiryDate: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days from now
            createdAt: Date.now(),
            ownerEmail: user?.email
        };

        const updatedProps = [...userProperties, newProperty];
        setUserProperties(updatedProps);
        localStorage.setItem('directhome_user_properties', JSON.stringify(updatedProps));

        if (user) {
            const updatedUser = { ...user, propertyCount: (user.propertyCount || 0) + 1 };
            setUser(updatedUser);
            localStorage.setItem('directhome_user', JSON.stringify(updatedUser));
        }
    };

    const renewProperty = (propertyId) => {
        const updatedProps = userProperties.map(prop => {
            if (prop.id === propertyId) {
                return { ...prop, expiryDate: Date.now() + 30 * 24 * 60 * 60 * 1000 };
            }
            return prop;
        });
        setUserProperties(updatedProps);
        localStorage.setItem('directhome_user_properties', JSON.stringify(updatedProps));
    };

    const resetPassword = (email) => {
        const userExists = registeredUsers.some(u => u.email.toLowerCase() === email.toLowerCase());
        if (userExists) {
            return { success: true, message: "Password reset link sent to your email." };
        }
        return { success: false, message: "No account found with this email." };
    };

    const incrementPropertyCount = () => {
        if (user) {
            const updatedUser = { ...user, propertyCount: (user.propertyCount || 0) + 1 };
            setUser(updatedUser);
            localStorage.setItem('directhome_user', JSON.stringify(updatedUser));
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('directhome_user');
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            userProperties,
            login,
            signup,
            logout,
            incrementPropertyCount,
            subscribe,
            toggleFavorite,
            addProperty,
            renewProperty,
            resetPassword
        }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
