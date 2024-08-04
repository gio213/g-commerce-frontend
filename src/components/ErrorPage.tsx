import { motion } from "framer-motion";

type ErrorPageProps = {
  text: string;
};

const ErrorPage = ({ text }: ErrorPageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f8d7da",
        color: "#721c24",
        fontSize: "24px",
        fontWeight: "bold",
        textAlign: "center",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      {text}
    </motion.div>
  );
};

export default ErrorPage;
