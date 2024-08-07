import React, { useState } from "react";
import camera from '../../assets/icons/camera.png';

export const PlusStep = ({ index }) => {
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div className="plusStep">
      <div className="input-step-img">
        {image && <img src={URL.createObjectURL(image)} alt="Uploaded" />}
        {!image && (
          <>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
              id={`imageInput-${index}`}
            />
            <label htmlFor={`imageInput-${index}`}>
              <img src={camera} alt="camera" />
            </label>
          </>
        )}
      </div>
      <span className="stepNum">{index + 1}</span>
      <input placeholder="내용을 입력해주세요" />
    </div>
  );
};
