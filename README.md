# PiForce Academy - Academic Resource Platform

A comprehensive academic resource platform for BLE, SEE, and +2 students in Nepal. Built with React and modern web technologies.

## 🚀 Features

- **Study Resources**: Access model questions, past papers, and comprehensive notes
- **GPA Calculator**: Calculate GPA for SEE and +2 levels
- **AI Assistant**: Get instant help with academic questions
- **Resource Upload**: Share your study materials with the community
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 📁 Project Structure

```
/public
  └── index.html          # Main HTML file
  └── assets/             # Static assets (images, logos, etc.)

/src
  ├── components/         # Reusable React components
  │   └── Navbar.jsx      # Navigation component
  │   └── Footer.jsx      # Footer component
  │   └── Chatbot.jsx     # AI chat assistant
  │   └── GPA.jsx         # GPA calculator component
  │   └── UploadForm.jsx  # Resource upload form
  ├── pages/              # Page components
  │   └── Home.jsx        # Home page
  │   └── Resources.jsx   # Resources page
  ├── data/               # Data files
  │   └── sampleResources.js  # Sample resource data
  │   └── chatMessages.js     # Sample chat messages
  ├── App.jsx             # Main application component
  └── main.jsx            # Application entry point

/styles
  └── style.css           # Main stylesheet
  └── variables.css       # CSS custom properties

/vite.config.js           # Vite configuration
/package.json             # Project dependencies and scripts
```

## 🛠️ Technology Stack

- **Frontend**: React 18
- **Build Tool**: Vite
- **Styling**: CSS3 with custom properties
- **Icons**: Font Awesome
- **Development**: ESLint for code quality

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd PiForce Academy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Key Components

### Components
- **Navbar**: Navigation with page routing
- **Footer**: Site footer with links and contact info
- **Chatbot**: AI assistant for academic help
- **GPA**: GPA calculator for different academic levels
- **UploadForm**: Form for uploading study resources

### Pages
- **Home**: Landing page with features and statistics
- **Resources**: Browse and search academic resources

### Data
- **sampleResources.js**: Sample data for BLE, SEE, and +2 resources
- **chatMessages.js**: Sample chat conversation data

## 🎨 Styling

The project uses CSS custom properties (variables) for consistent theming:

- **Colors**: Primary, secondary, accent colors
- **Typography**: Font sizes and families
- **Spacing**: Consistent spacing scale
- **Shadows**: Elevation and depth
- **Transitions**: Smooth animations

## 🔧 Development

### Adding New Components
1. Create component file in `src/components/`
2. Import and use in relevant pages
3. Add styles to `styles/style.css`

### Adding New Pages
1. Create page file in `src/pages/`
2. Add route in `src/App.jsx`
3. Update navigation in `src/components/Navbar.jsx`

### Data Management
- Static data goes in `src/data/`
- Use React hooks for state management
- Consider context for global state if needed

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions:
- Email: info@protonacademy.com
- Phone: +977-1-1234567

---

**PiForce Academy** - Empowering Nepali students with quality educational resources and tools. 