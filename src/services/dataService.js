import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  setDoc, 
  getDoc, 
  query, 
  orderBy, 
  serverTimestamp 
} from "firebase/firestore";
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from "firebase/storage";
import { db, storage } from "../firebase/config";
import { PORTFOLIO_ITEMS, HOME_CATEGORY_TILES, STUDIO_INFO } from "../data/photographyData";

// --- PORTFOLIO ITEMS ---

/**
 * Fetch all portfolio items from Firestore.
 * If Firestore is empty, seed initial data from photographyData.js!
 */
export async function getPortfolioItems() {
  try {
    // 800ms timeout race so UI never buffers or waits endlessly
    const fetchPromise = (async () => {
      const querySnapshot = await getDocs(collection(db, "portfolio"));
      
      let needsReseed = querySnapshot.empty;
      const existingDocs = [];
      
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        if (!data.image || data.image.includes("Image-")) {
          needsReseed = true;
        }
        existingDocs.push({ id: docSnap.id, ...data });
      });

      if (needsReseed) {
        console.log("Reseeding portfolio data in background...");
        // Non-blocking background re-seed
        (async () => {
          for (const oldDoc of existingDocs) {
            try { await deleteDoc(doc(db, "portfolio", oldDoc.id)); } catch (e) {}
          }
          for (const item of PORTFOLIO_ITEMS) {
            try {
              await addDoc(collection(db, "portfolio"), {
                title: item.title,
                category: item.category,
                heightClass: item.heightClass || "h-[500px]",
                image: item.image,
                createdAt: serverTimestamp()
              });
            } catch (e) {}
          }
        })();
        return PORTFOLIO_ITEMS.map((item, idx) => ({ id: `local-${idx}`, ...item }));
      }

      return existingDocs.length > 0 ? existingDocs : PORTFOLIO_ITEMS;
    })();

    const timeoutPromise = new Promise((resolve) => 
      setTimeout(() => resolve(PORTFOLIO_ITEMS.map((item, idx) => ({ id: `fast-${idx}`, ...item }))), 600)
    );

    return await Promise.race([fetchPromise, timeoutPromise]);
  } catch (error) {
    console.error("Error getting portfolio items:", error);
    return PORTFOLIO_ITEMS.map((item, idx) => ({ id: `static-${idx}`, ...item }));
  }
}

/**
 * Add a new portfolio item to Firestore.
 * Optionally uploads an image file to Firebase Storage if provided.
 */
export async function addPortfolioItem(itemData, imageFile) {
  try {
    let imageUrl = itemData.image || "";

    if (imageFile) {
      const storageRef = ref(storage, `portfolio/${Date.now()}_${imageFile.name}`);
      const snapshot = await uploadBytes(storageRef, imageFile);
      imageUrl = await getDownloadURL(snapshot.ref);
    }

    const docData = {
      title: itemData.title,
      category: itemData.category || "Weddings",
      heightClass: itemData.heightClass || "h-[500px]",
      image: imageUrl,
      createdAt: serverTimestamp()
    };

    const docRef = await addDoc(collection(db, "portfolio"), docData);
    return { id: docRef.id, ...docData };
  } catch (error) {
    console.error("Error adding portfolio item:", error);
    throw error;
  }
}

/**
 * Update an existing portfolio item.
 */
export async function updatePortfolioItem(id, updatedFields, newImageFile = null) {
  try {
    let imageUrl = updatedFields.image;

    if (newImageFile) {
      const storageRef = ref(storage, `portfolio/${Date.now()}_${newImageFile.name}`);
      const snapshot = await uploadBytes(storageRef, newImageFile);
      imageUrl = await getDownloadURL(snapshot.ref);
    }

    const docRef = doc(db, "portfolio", id);
    const dataToUpdate = {
      ...updatedFields,
      image: imageUrl,
      updatedAt: serverTimestamp()
    };

    await updateDoc(docRef, dataToUpdate);
    return { id, ...dataToUpdate };
  } catch (error) {
    console.error("Error updating portfolio item:", error);
    throw error;
  }
}

/**
 * Delete a portfolio item.
 */
export async function deletePortfolioItem(id) {
  try {
    const docRef = doc(db, "portfolio", id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error("Error deleting portfolio item:", error);
    throw error;
  }
}

// --- HOME PAGE SETTINGS ---

export const DEFAULT_HERO_SLIDES = [
  { id: 'def-1', title: "Maharashtrian Royal Wedding", location: "Maharashtra", tag: "Wedding Ceremonies", image: "/Weddings/wedding-4.jpg", objectPos: "50% 50%", scale: 1.0, fitMode: "cover", isDefault: true },
  { id: 'def-2', title: "Alok & Alena Pre-Wedding", location: "Karad, Maharashtra", tag: "Pre-Wedding Shoot", image: "/Prewedding/prewedding-1.jpg", objectPos: "50% 40%", scale: 1.0, fitMode: "cover", isDefault: true },
  { id: 'def-3', title: "Mahantesh & Rutuja Wedding", location: "Sangli, Maharashtra", tag: "Traditional Rituals", image: "/Weddings/wedding-2.webp", objectPos: "50% 50%", scale: 1.0, fitMode: "cover", isDefault: true },
  { id: 'def-4', title: "Endless Laughter & Love", location: "Satara, Maharashtra", tag: "Romantic Stories", image: "/Prewedding/prewedding-8.jpg", objectPos: "50% 50%", scale: 1.0, fitMode: "cover", isDefault: true },
  { id: 'def-5', title: "Royal Fine Art Portrait", location: "Sachin Ghongade Photo Studio", tag: "Portrait Craft", image: "/Weddings/wedding-6.jpg", objectPos: "50% 50%", scale: 1.0, fitMode: "cover", isDefault: true }
];

export async function getHomeSettings() {
  try {
    const docRef = doc(db, "settings", "home");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      let hasChanges = false;
      const updated = { ...data };

      if (data.heroImage && data.heroImage.includes("Image-")) {
        updated.heroImage = "/Weddings/wedding-4.jpg";
        updated.categoryTiles = HOME_CATEGORY_TILES;
        hasChanges = true;
      }

      if (data.heroTitle === "TIMELINES & UNGUARDED EMOTIONS" || !data.heroTitle) {
        updated.heroTitle = "Capturing Real Emotions.";
        updated.heroSubtitle = "Candid & Fine Art Wedding Photography";
        hasChanges = true;
      }

      if (!data.heroSlides || !Array.isArray(data.heroSlides) || data.heroSlides.length === 0) {
        updated.heroSlides = DEFAULT_HERO_SLIDES;
        hasChanges = true;
      }

      if (hasChanges) {
        await setDoc(docRef, updated, { merge: true });
        return updated;
      }
      return data;
    } else {
      // Default home settings
      const defaultSettings = {
        heroTitle: "Capturing Real Emotions.",
        heroSubtitle: "Candid & Fine Art Wedding Photography",
        heroImage: "/Weddings/wedding-4.jpg",
        heroSlides: DEFAULT_HERO_SLIDES,
        categoryTiles: HOME_CATEGORY_TILES
      };
      await setDoc(docRef, defaultSettings);
      return defaultSettings;
    }
  } catch (error) {
    console.error("Error getting home settings:", error);
    return {
      heroTitle: "Capturing Real Emotions.",
      heroSubtitle: "Candid & Fine Art Wedding Photography",
      heroImage: "/Weddings/wedding-4.jpg",
      heroSlides: DEFAULT_HERO_SLIDES,
      categoryTiles: HOME_CATEGORY_TILES
    };
  }
}

export async function updateHomeSettings(settingsData, heroImageFile = null) {
  try {
    let heroImageUrl = settingsData.heroImage;

    if (heroImageFile) {
      const storageRef = ref(storage, `home/${Date.now()}_${heroImageFile.name}`);
      const snapshot = await uploadBytes(storageRef, heroImageFile);
      heroImageUrl = await getDownloadURL(snapshot.ref);
    }

    const docRef = doc(db, "settings", "home");
    const updated = {
      ...settingsData,
      heroImage: heroImageUrl,
      updatedAt: serverTimestamp()
    };

    await setDoc(docRef, updated, { merge: true });
    return updated;
  } catch (error) {
    console.error("Error updating home settings:", error);
    throw error;
  }
}

export async function addHeroSlide(slideTitle, imageFile, objectPos = "50% 30%", scale = 1.0, fitMode = "cover") {
  try {
    const storageRef = ref(storage, `home/slides/${Date.now()}_${imageFile.name}`);
    const snapshot = await uploadBytes(storageRef, imageFile);
    const downloadUrl = await getDownloadURL(snapshot.ref);

    const docRef = doc(db, "settings", "home");
    const docSnap = await getDoc(docRef);
    const currentData = docSnap.exists() ? docSnap.data() : {};
    const existingSlides = currentData.heroSlides || DEFAULT_HERO_SLIDES;

    const newSlide = {
      id: `custom-slide-${Date.now()}`,
      title: slideTitle || "Custom Hero Background",
      location: "Sachin Ghongade Photo Studio",
      tag: "Featured Banner",
      image: downloadUrl,
      objectPos: objectPos || "50% 30%",
      scale: scale || 1.0,
      fitMode: fitMode || "cover",
      isDefault: false,
      createdAt: new Date().toISOString()
    };

    const updatedSlides = [newSlide, ...existingSlides];
    await setDoc(docRef, { ...currentData, heroSlides: updatedSlides, heroImage: downloadUrl, updatedAt: serverTimestamp() }, { merge: true });
    return updatedSlides;
  } catch (error) {
    console.error("Error adding hero slide:", error);
    throw error;
  }
}

export async function deleteHeroSlide(slideId) {
  try {
    const docRef = doc(db, "settings", "home");
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return DEFAULT_HERO_SLIDES;

    const currentData = docSnap.data();
    const existingSlides = currentData.heroSlides || DEFAULT_HERO_SLIDES;
    const updatedSlides = existingSlides.filter(s => s.id !== slideId);

    await setDoc(docRef, { ...currentData, heroSlides: updatedSlides, updatedAt: serverTimestamp() }, { merge: true });
    return updatedSlides;
  } catch (error) {
    console.error("Error deleting hero slide:", error);
    throw error;
  }
}

export async function updateHeroSlide(slideId, updatedData, newImageFile = null) {
  try {
    let imageUrl = updatedData.image;

    if (newImageFile) {
      const storageRef = ref(storage, `home/slides/${Date.now()}_${newImageFile.name}`);
      const snapshot = await uploadBytes(storageRef, newImageFile);
      imageUrl = await getDownloadURL(snapshot.ref);
    }

    const docRef = doc(db, "settings", "home");
    const docSnap = await getDoc(docRef);
    const currentData = docSnap.exists() ? docSnap.data() : {};
    const existingSlides = currentData.heroSlides || DEFAULT_HERO_SLIDES;

    const updatedSlides = existingSlides.map(slide => {
      if (slide.id === slideId) {
        return {
          ...slide,
          title: updatedData.title !== undefined ? updatedData.title : slide.title,
          tag: updatedData.tag !== undefined ? updatedData.tag : slide.tag,
          location: updatedData.location !== undefined ? updatedData.location : slide.location,
          objectPos: updatedData.objectPos !== undefined ? updatedData.objectPos : (slide.objectPos || "50% 30%"),
          scale: updatedData.scale !== undefined ? updatedData.scale : (slide.scale || 1.0),
          fitMode: updatedData.fitMode !== undefined ? updatedData.fitMode : (slide.fitMode || "cover"),
          image: imageUrl,
          updatedAt: new Date().toISOString()
        };
      }
      return slide;
    });

    await setDoc(docRef, { ...currentData, heroSlides: updatedSlides, updatedAt: serverTimestamp() }, { merge: true });
    return updatedSlides;
  } catch (error) {
    console.error("Error updating hero slide:", error);
    throw error;
  }
}

export async function resetDefaultHeroSlides() {
  try {
    const docRef = doc(db, "settings", "home");
    const docSnap = await getDoc(docRef);
    const currentData = docSnap.exists() ? docSnap.data() : {};

    await setDoc(docRef, { ...currentData, heroSlides: DEFAULT_HERO_SLIDES, updatedAt: serverTimestamp() }, { merge: true });
    return DEFAULT_HERO_SLIDES;
  } catch (error) {
    console.error("Error resetting hero slides:", error);
    throw error;
  }
}

// --- STUDIO SETTINGS ---

export async function getStudioSettings() {
  try {
    const docRef = doc(db, "settings", "studio");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      await setDoc(docRef, STUDIO_INFO);
      return STUDIO_INFO;
    }
  } catch (error) {
    console.error("Error getting studio settings:", error);
    return STUDIO_INFO;
  }
}

export async function updateStudioSettings(settingsData) {
  try {
    const docRef = doc(db, "settings", "studio");
    const updated = {
      ...settingsData,
      updatedAt: serverTimestamp()
    };
    await setDoc(docRef, updated, { merge: true });
    return updated;
  } catch (error) {
    console.error("Error updating studio settings:", error);
    throw error;
  }
}

// --- CONTACT MESSAGES ---

export async function getContactMessages() {
  try {
    const querySnapshot = await getDocs(collection(db, "messages"));
    const messages = [];
    querySnapshot.forEach((docSnap) => {
      messages.push({ id: docSnap.id, ...docSnap.data() });
    });
    return messages.sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0));
  } catch (error) {
    console.error("Error getting contact messages:", error);
    return [];
  }
}

export async function saveContactMessage(messageData) {
  try {
    const docRef = await addDoc(collection(db, "messages"), {
      ...messageData,
      createdAt: serverTimestamp()
    });
    return { id: docRef.id, ...messageData };
  } catch (error) {
    console.error("Error saving contact message:", error);
    throw error;
  }
}

export async function deleteContactMessage(id) {
  try {
    await deleteDoc(doc(db, "messages", id));
    return true;
  } catch (error) {
    console.error("Error deleting message:", error);
    throw error;
  }
}
