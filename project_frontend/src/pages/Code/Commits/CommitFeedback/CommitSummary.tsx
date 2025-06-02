import { motion } from "framer-motion";
import botImage from "../../../../images/robot_male_1.svg";

type Props = {
  summary: string;
};

export default function CommitSummary({ summary }: Props) {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 bg-[#1c2128] border border-[#30363d] rounded-lg p-6">
        {/* Bot image with floating effect */}
        <motion.img
          src={botImage}
          alt="Bot feedback icon"
          initial={{ y: 0 }}
          animate={{ y: -10 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          className="w-24 h-24 object-contain mx-auto md:mx-0"
        />

        {/* Summary Text */}
        <div className="text-sm text-gray-200 leading-relaxed whitespace-pre-line">
          {summary}
        </div>
      </div>
    </>
  );
}
