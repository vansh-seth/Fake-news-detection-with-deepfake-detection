const API_BASE_URL = "http://localhost:8000/api";

export const analyzeNewsText = async (text) => {
  try {
    const response = await fetch(`${API_BASE_URL}/analyze/text`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to analyze text");
    }

    return await response.json();
  } catch (error) {
    console.error("Error analyzing text:", error);
    throw error;
  }
};

export const analyzeImage = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append("file", imageFile);

    const response = await fetch(`${API_BASE_URL}/analyze/image`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to analyze image");
    }

    return await response.json();
  } catch (error) {
    console.error("Error analyzing image:", error);
    throw error;
  }
};