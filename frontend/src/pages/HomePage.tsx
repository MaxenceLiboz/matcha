import React from "react";
import Layout from "../layouts/MainLayout";
import { ProfileForm } from "../features/profile/components/ProfileForm";

const HomePage: React.FC = () => {
  return (
    <Layout>
      <ProfileForm />
    </Layout>
  );
};

export default HomePage;
