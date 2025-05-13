
# Application architecture for backend and frontend

We are going to use the principle of Clean Architecture / DDD / Layered Architecture approch for both the backend and frontend. 

## Backend architecture 

Therefore we will separate our folder into this:  
```
/src  
|-- domain/                  # 1. Innermost: Hold everyting releated to entites  
|   |-- info/            # Core classes (e.g., User.ts, Profile.ts) - Plain classes  
|   |-- repositories/        # **<< INTERFACES ONLY >>** (e.g., IUserRepository.ts, IProfileRepository.ts) - Defines contracts for specific entities  
|   |-- errors/              # (Optional) Custom domain-specific errors  
|  
|-- application/             # 2. Application Business Rules  
|   |-- use-cases/           # Specific application actions (e.g., CreateUserUseCase.ts, MatchUserUseCase.ts), implements the repositories interface  
|   |   |-- user/  
|   |   |   |-- CreateUserUseCase.ts  
|   |   |   |-- GetUserByIdUseCase.ts  
|   |   |   |-- MatchUserUseCase.ts  
|   |-- services/            # Application Services - Orchestrate use cases or simpler operations  
|   |   |-- UserService.ts   # Depends on IUserRepository and IProfileRepository, calls multiple UseCases  
|   |-- dtos/                # Data Transfer Objects for input/output structuring  
|  
|-- infrastructure/          # 3. Outer Layer: Frameworks, Drivers, Tools  
|   |-- database/            # Concrete database implementations  
|   |   |-- db.ts            # Define database schema as a TypeScript interface for Kysely.     
|   |   |-- repositories/    # **<< CONCRETE IMPLEMENTATIONS >>** (e.g., UserRepository.ts implements IUserRepository)         
|   |   |-- mappers/         # Map db interface with domain entities  
|   |-- web/                 # Web framework specifics  
|   |   |-- express.ts       # Express app setup, middleware configuration  
|   |   |-- controllers/     # Express route handlers (e.g., UserController.ts, OrderController.ts)  
|   |   |-- routes/          # Route definitions (e.g., userRoutes.ts, orderRoutes.ts)  
|   |   |-- middleware/      # Custom Express middleware  
|   |-- external-services/   # Clients for external APIs (e.g., API to locate users)  
|   |-- config/              # Configuration loading (e.g., dotenv setup)  
|
|-- main.ts / index.ts       # Composition Root: Initializes everything, starts the server etc.  
```

## Frontemd architecture

```
/src
|-- app/                     # Global app setup, providers, main layout
|   |-- App.tsx              # Main application component
|   |-- main.tsx             # Entry point, renders App
|   |-- providers/           # Context providers, theme provider, etc.
|   |-- routing/             # App-level routing configuration
|       |-- AppRoutes.tsx
|       |-- protectedRoute.tsx
|
|-- components/              # SHARED, Reusable UI components (atoms, molecules)
|   |-- Button/
|   |   |-- Button.tsx
|   |-- Input/
|   |-- Modal/
|   |-- ...
|
|-- features/                # Business domain features (e.g., user-profile, product-list)
|   |-- user-profile/
|   |   |-- components/      # UI components specific to this feature
|   |   |   |-- UserAvatar.tsx
|   |   |   |-- ProfileForm.tsx
|   |   |-- hooks/           # Custom hooks specific to this feature
|   |   |   |-- useUserProfile.ts
|   |   |-- api/        # API calls specific to this feature (can also be global)
|   |   |   |-- userProfileAPI.ts
|   |   |-- pages/           # Pages/views related to this feature (assembled here)
|   |   |   |-- UserProfilePage.tsx
|   |   |-- store/           # State slice specific to this feature (if applicable)
|   |   |   |-- userProfileSlice.ts
|   |   |-- types.ts         # Types specific to this feature
|   |   |-- index.ts         # Barrel file to export feature's public API  
|
|-- pages/                   # Top-level pages 
|   |-- HomePage.tsx
|   |-- AboutPage.tsx
|
|-- layouts/                 # Layout components (e.g., MainLayout, AuthLayout)
|   |-- MainLayout.tsx
|
|-- hooks/                   # SHARED, Reusable custom hooks
|   |-- useAuth.ts
|   |-- useDebounce.ts
|
|-- api/                     # SHARED, API service layer (data fetching logic)
|   |-- apiClient.ts         # Axios instance, base fetch config
|   |-- authAPI.ts
|
|-- styles/                  # Global styles, theme variables, resets
|   |-- global.css
|   |-- theme.ts
|
|-- utils/                   # SHARED, Utility functions (formatters, validators)
|   |-- validators.ts
|   |-- dateUtils.ts
|
|-- types/                   # Global TypeScript types/interfaces
|   |-- index.ts
|   |-- global.d.ts
|
|-- assets/                  # Static assets (images, fonts)
|
|-- config/                  # Environment variables, app configuration
```