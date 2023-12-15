import React, { useState } from "react";
import Modal from "./Modal";
import "./Modal.scss";
import styles from "./ProfilePreview.module.scss";
import PlayerCard from "./PlayerCard";

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
    <>
      <PlayerCard userData={userData} />

      <Modal show={showAvatarModal} onClose={handleAvatarModal} title="Change Your Avatar">
        {/* Avatar options go here */}
        <button onClick={saveAvatarChanges}>Save Changes</button>
      </Modal>

      <Modal show={showAccountModal} onClose={handleAccountModal} title="Account Details">
        {/* Account detail fields go here */}
        <button onClick={saveAccountChanges}>Save Changes</button>
      </Modal>
    </>
  );
}

export default ProfilePreview;
