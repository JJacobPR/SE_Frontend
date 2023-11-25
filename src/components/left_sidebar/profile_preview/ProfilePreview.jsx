import React, { useState } from 'react';
import Modal from './Modal';
import './Modal.scss';
import styles from './ProfilePreview.module.scss';
import { Link } from "react-router-dom";

function ProfilePreview({ userData }) {
    const [showAvatarModal, setShowAvatarModal] = useState(false);
    const [showAccountModal, setShowAccountModal] = useState(false);

    const handleAvatarModal = () => setShowAvatarModal(!showAvatarModal);
    const handleAccountModal = () => setShowAccountModal(!showAccountModal);

    // Placeholder functions for saving changes
    const saveAvatarChanges = () => {
        // ...
    };

    const saveAccountChanges = () => {
        // ...
    };

    if (!userData) {
        return <div>Loading user data...</div>;
    }

    return (
        <div>
            <div className={styles.profile} >
                <h2>{userData.name}</h2>
                <h3>Level: {userData.level}</h3>
                <h3>Experience: {userData.experience}</h3>
                <h3>Anonymous: {userData.anonymous ? 'Yes' : 'No'}</h3>
                <div className={styles.edit}>
                    <Link to="account">
                        <button>Edit Account</button>
                    </Link>
                </div>
            </div>

            <Modal show={showAvatarModal} onClose={handleAvatarModal} title="Change Your Avatar">
                {/* Avatar options go here */}
                <button onClick={saveAvatarChanges}>Save Changes</button>
            </Modal>

            <Modal show={showAccountModal} onClose={handleAccountModal} title="Account Details">
                {/* Account detail fields go here */}
                <button onClick={saveAccountChanges}>Save Changes</button>
            </Modal>
        </div>
    );
}

export default ProfilePreview;
