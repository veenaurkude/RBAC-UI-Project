# RBAC UI Dashboard

Live Deploy Link - https://rbacdashboardbyabhay.netlify.app/

## Overview

The RBAC (Role-Based Access Control) UI Dashboard is a comprehensive web application built with Next.js and React. It provides a user-friendly interface for managing users, roles, and permissions in a role-based access control system. This project demonstrates best practices in building responsive, accessible, and feature-rich admin interfaces.

## Features

- User Management: Add, edit, delete, and view users
- Role Management: Create, modify, and delete roles
- Permission Management: Assign and revoke permissions for roles
- Responsive Design: Fully responsive interface that works on desktop, tablet, and mobile devices
- Real-time Updates: Simulated API calls for CRUD operations
- Search Functionality: Filter users, roles, and permissions
- Audit Logs: Track changes made to users, roles, and permissions

## Technologies Used

- Next.js 13+ (App Router)
- React 18+
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Axios for API calls
- Lucide React for icons

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or later)
- npm (v6 or later)

## Installation

1. Clone the repository:

git clone [https://github.com/MrAbhayKumawat/rbac-ui-dashboard.git](https://github.com/MrAbhayKumawat/rbac-ui-dashboard.git)
cd rbac-ui-dashboard


3. Install shadcn/ui components:



4. Set up your environment variables:
Create a `.env.local` file in the root directory and add any necessary environment variables.

## Running the Application

To start the development server:



Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Project Structure


rbac-ui-dashboard/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── roles/
│   │   └── page.tsx
│   ├── permissions/
│   │   └── page.tsx
│   └── logs/
│       └── page.tsx
├── components/
│   ├── ui/
│   │   └── ... (shadcn/ui components)
│   ├── user-management.tsx
│   ├── role-management.tsx
│   ├── permission-management.tsx
│   └── sidebar.tsx
├── lib/
│   └── mock-api.ts
├── public/
├── styles/
│   └── globals.css
├── .gitignore
├── next.config.js
├── package.json
├── README.md
├── tailwind.config.js
└── tsconfig.json



## Usage

1. **User Management**: Navigate to the Users tab to view, add, edit, or delete users. You can also assign roles to users and change their status.

2. **Role Management**: In the Roles tab, you can create new roles, modify existing ones, and assign permissions to roles.

3. **Permission Management**: The Permissions tab allows you to create and manage individual permissions, which can then be assigned to roles.

4. **Audit Logs**: View a log of all actions performed within the system in the Audit Logs tab.

## Customization

- To modify the UI components, refer to the shadcn/ui documentation and edit the components in the `components/ui` directory.
- To change the color scheme or other design aspects, modify the `tailwind.config.js` file and the global styles in `styles/globals.css`.
- To add or modify API endpoints, update the `lib/mock-api.ts` file.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)

## Support

For support, please open an issue in the GitHub repository or contact [mrabhaykumawat9@gmail.com](mailto:mrabhaykumawat9@gmail.com).
