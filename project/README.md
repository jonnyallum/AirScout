# AirScout – Global Smart Booking Platform

![AirScout Logo](https://via.placeholder.com/200x60?text=AirScout)

AirScout is a smart, scalable platform for discovering, managing, and monetizing short-term rental properties globally — built with Next.js, Supabase, Stripe, and OpenAI.

## 🚀 Features

- **Property Discovery**: Browse curated stays by type or location
- **Smart Booking**: Seamless reservation and payment process
- **Host Dashboard**: Manage listings, bookings, and earnings
- **AI-Powered Listings**: Generate optimized descriptions and pricing
- **Secure Payments**: Split payments with Stripe Connect
- **Automated Workflows**: Email notifications and booking management
- **Mobile Responsive**: Optimized for all devices

## 🛠️ Tech Stack

- **Frontend**: Next.js (React), Tailwind CSS
- **Backend**: Supabase (Postgres, Auth, Storage, RPC)
- **Payments**: Stripe Connect
- **AI/Automation**: OpenAI, N8N, Zapier
- **Email**: Postmark or SendGrid
- **Mobile**: Expo + React Native

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Stripe account
- OpenAI API key
- Email service API key (Postmark or SendGrid)

## 🔧 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jonnyallum/AirScout.git
   cd AirScout
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your API keys and configuration
   ```

4. Set up Supabase:
   - Create a new Supabase project
   - Run the SQL scripts in `backend/supabase/` to set up the database schema
   - Update your `.env.local` with Supabase credentials

5. Set up Stripe:
   - Create a Stripe account and enable Connect
   - Add your Stripe API keys to `.env.local`
   - Configure webhook endpoints

6. Start the development server:
   ```bash
   npm run dev
   ```

## 🏗️ Project Structure

```
/airscout
│
├── /frontend                # Next.js app
│   ├── /components          # Reusable UI components
│   ├── /pages               # Page routing
│   ├── /styles              # Tailwind CSS
│   ├── /utils               # Helper functions
│   └── /api                 # API routes
│
├── /backend                 # Supabase + N8n flows
│   ├── /supabase            # SQL schema, RPCs, auth rules
│   ├── /n8n-flows           # Automated workflows
│   └── /gpt-prompts         # Stored prompt libraries
│
├── /docs                    # Documentation
│
└── /scripts                 # Deployment and utility scripts
```

## 🚢 Deployment

### Vercel Deployment

```bash
npm run build
# Deploy using Vercel CLI or GitHub integration
```

### CapRover Deployment

```bash
# Build the Docker image
docker build -t airscout .

# Deploy to CapRover
caprover deploy -i airscout
```

### Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up -d
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run linting
npm run lint
```

## 📱 Mobile App

The mobile app is built with React Native (Expo) and can be found in the `/mobile-app` directory.

```bash
cd mobile-app
npm install
npm start
```

## 📚 Documentation

For more detailed documentation, see:

- [System Architecture](docs/system-architecture.md)
- [API Documentation](docs/api-docs.md)
- [User Guide](docs/user-guide.md)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

Jonny Allum - [@jonnyallum](https://twitter.com/jonnyallum)

Project Link: [https://github.com/jonnyallum/AirScout](https://github.com/jonnyallum/AirScout)
