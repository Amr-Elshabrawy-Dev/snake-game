# 🐍 Snake Game with JavaScript

<div align="center">

[**🌐 View Live Demo**](https://amr-elshabrawy-dev.github.io/snake-game/) | [**📦 GitHub Repo**](https://github.com/Amr-Elshabrawy-Dev/snake-game)

![GitHub repo size](https://img.shields.io/github/repo-size/Amr-Elshabrawy-Dev/snake-game?style=social&logo=github) ![GitHub stars](https://img.shields.io/github/stars/Amr-Elshabrawy-Dev/snake-game?style=social) ![GitHub forks](https://img.shields.io/github/forks/Amr-Elshabrawy-Dev/snake-game?style=social) ![GitHub watchers](https://img.shields.io/github/watchers/Amr-Elshabrawy-Dev/snake-game?style=social)

This is a simple snake game made with JavaScript, HTML, and CSS. The game includes features such as player registration, score tracking, and customizable settings.
</div>

## ✨ Features

- **Player Registration** 📝: Players can register with their name and email to track their scores.
- **Score Tracking** 🏆: The game tracks and displays the top scores.
- **Customizable Settings** ⚙️: Players can customize the snake color, toggle between light and dark themes, and enable or disable random food colors.
- **Email Notifications** 📧: Players receive email notifications with their scores.

## 🛠️ Core Technologies

- **HTML** 🌐: Structure and layout of the game interface
- **CSS** 🎨: Styling and responsive design
- **JavaScript** 💻: Game logic and interactivity
- **EmailJS** 📧: Email notification service
- **Local Storage** 💾: Score and settings persistence

## 🚧 Challenges Faced

During the development of this Snake Game, several technical challenges were encountered and successfully addressed:

- **Collision Detection** 💥: Implementing accurate collision detection between the snake and walls/itself required careful coordinate tracking and boundary checking.
- **Smooth Movement** 🔄: Ensuring smooth snake movement while maintaining precise controls and preventing rapid reverse direction changes.
- **State Management** 📊: Managing game state effectively, including pause/resume functionality and score tracking across sessions.
- **Mobile Responsiveness** 📱: Adapting the game controls and display for various screen sizes and touch interfaces.
- **Performance Optimization** ⚡: Optimizing rendering and update loops to maintain smooth gameplay, especially as the snake grows longer.
- **Email Integration** 📨: Implementing secure and reliable email notifications without exposing sensitive credentials.

## 🚀 Setup Instructions

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-username/snake-game.git
   cd snake-game
   ```

2. **Open the Project**:

   Open the `index.html` file in your web browser to start the game.

3. **Configure EmailJS**:

   - Sign up for an account on [EmailJS](https://www.emailjs.com/).
   - Create a new email service and template.
   - Update `app.js` with your EmailJS credentials:

     ```javascript
     // Initialize EmailJS with your public key
     emailjs.init("YOUR_EMAILJS_PUBLIC_KEY"); // Replace with your EmailJS public key
     const EMaILJS_SERVICE_ID = "YOUR_SERVICE_ID";
     const EMaILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
     ```

## 🎮 Usage

- **Start/Pause**: Press the `Space` key to start or pause the game.
- **Move Snake**: Use the arrow keys (`↑`, `↓`, `←`, `→`) or `W`, `A`, `S`, `D` keys to move the snake.
- **Restart Game**: Click the "Restart Game" button when the game is over.

## ⚙️ Configuration

- **Theme Mode** 🌓: Toggle between light and dark themes in the settings.
- **Snake Color** 🎨: Choose a custom color for the snake in the settings.
- **Random Food Colors** 🍎: Enable or disable random food colors in the settings.

## 📚 Acquired Knowledge

Through developing this Snake Game, I gained valuable experience in:

- **Game Development Logic** 🎮: Understanding game loops, state management, and player interactions
- **DOM Manipulation** 🔄: Dynamic updates of game elements and UI components
- **Event Handling** ⌨️: Managing keyboard inputs and touch events for controls
- **Local Storage** 💾: Implementing data persistence for game settings and scores
- **API Integration** 🔌: Working with external services (EmailJS) for notifications
- **Responsive Design** 📱: Creating adaptive layouts for different screen sizes
- **Performance Optimization** ⚡: Techniques for smooth gameplay and efficient rendering
- **User Experience** 👥: Designing intuitive controls and feedback mechanisms

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes. Ensure your code follows the project's coding standards and includes appropriate tests.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 🌐 Let's Connect

<div align="center">
  
[![Portfolio](https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=google-chrome&logoColor=white)](https://github.com/Amr-Elshabrawy-Dev) [![WhatsApp](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/201202546653?text=Hi%20Amr!%20I%20saw%20your%20portfolio%20and%20would%20love%20to%20discuss%20a%20potential%20collaboration) [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Amr-Elshabrawy-Dev) [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=logmein&logoColor=white)](https://www.linkedin.com/in/amr-elshabrawy-dev) [![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:amrelshabrawy.dev@gmail.com) [![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=x&logoColor=white)](https://www.x.com/@AmrElshabr43803)

</div>

---

  <div align="center">
    <h1 style="color: #2ea44f;">👨‍💻 AMR ELSHABRAWY</h1>
      <img src="./amr.svg" alt="Amr Elshabrawy Logo" width="100px" style="margin: 1rem 0;">
      <p style="color: #586069; font-size: 1.1rem; margin-top: 1rem;">
        Created with 💚 by <strong><a href="https://github.com/Amr-Elshabrawy-Dev">AMR ELSHABRAWY</a></strong> 🌟 &copy; 2025
      </p>
  </div>

---