Here is a **GitHub `README.md`** file for your project. It focuses on **installation, requirements, and how to run the app**.  

---

### **README.md**  

```md
# BleuIO Serial Communication on Android  

This project enables **serial communication** between an **Android device** and a **BleuIO USB dongle** using **Capacitor 6** and `@adeunis/capacitor-serial`. The app allows sending and receiving **AT commands** over a USB OTG connection.

---

## **Requirements**  

- **Node.js** (Latest LTS) - [Download](https://nodejs.org/)  
- **Capacitor 6**  
- **JDK 17** (Required for Capacitor 6)  
- **Android Device with USB OTG Support**  
- **BleuIO USB Dongle**  

---

## **Installation**  

### ** Clone the Repository**  
```sh
git clone https://github.com/smart-sensor-devices-ab/bleuio-serial-android-typescript.git
cd bleuio-serial
```

### **Install Dependencies**  
```sh
npm install
```

### **Add Capacitor Android Platform**  
```sh
npx cap add android
```

### **Install Serial Plugin**  
```sh
npm install @adeunis/capacitor-serial
```

### **Ensure JDK 17 is Installed**  
```sh
java -version
```
If missing, install via:
```sh
sudo apt install openjdk-17-jdk  # Linux  
brew install openjdk@17          # macOS  
```

---

## **Running the App**  

### **Sync Project with Capacitor**  
```sh
npx cap sync android
```

### **Run on Android Device**  
```sh
npx cap run android
```
OR manually open **Android Studio**:  
```sh
npx cap open android
```
Then, click **Run (▶)** to deploy on a connected device.

---

## **Usage**  

1. **Connect BleuIO to Android via OTG.**  
2. **Open the app and click "Connect to BleuIO".**  
3. **Grant USB permission when prompted.**  
4. **Click "Send ATI Command"** to receive a response.  

---

## **License**  
This project is licensed under the **MIT License**.

