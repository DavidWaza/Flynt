import { motion } from "framer-motion";

interface TransactionItemProps {
  merchant: string;
  amount: number;
  category: string;
  date: string;
  icon: string;
}

export default function TransactionItem({
  merchant,
  amount,
  category,
  date,
  icon,
}: TransactionItemProps) {
  const isNegative = amount < 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 4, backgroundColor: "var(--bg-hover)" }}
      transition={{ duration: 0.2 }}
      className="flex items-center justify-between p-3 rounded-lg cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <motion.div
          whileHover={{ scale: 1.2, rotate: 10 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-bg-elevated text-lg"
        >
          {icon}
        </motion.div>
        <div>
          <p className="font-medium text-text-primary text-sm">{merchant}</p>
          <p className="text-xs text-text-muted">
            {category} • {date}
          </p>
        </div>
      </div>
      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className={`font-semibold ${isNegative ? "text-error" : "text-success"}`}
      >
        {isNegative ? "-" : "+"}₦{Math.abs(amount).toLocaleString()}
      </motion.span>
    </motion.div>
  );
}
