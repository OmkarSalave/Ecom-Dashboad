import { ReactNode } from 'react';
import { motion } from 'framer-motion';
interface Props {
  title: string;
  total: string;
  rate: string;
  levelUp?: boolean;
  levelDown?: boolean;
  children: ReactNode;
}

export default function CardData({
  title,
  total,
  rate,
  levelUp,
  children,
}: Props): JSX.Element {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      animate={{ scale: [0.4, 1] }}
      transition={{
        ease: 'linear',
        duration: 0.4,
        delay: 0.2,
        staggerDirection: 1,
        times: [0],
      }}
      className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default "
    >
      <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 ">
        {children}
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-black ">{total}</h4>
          <span className="text-sm font-medium">{title}</span>
        </div>

        <span
          className={`flex items-center gap-1 text-sm font-medium ${
            levelUp ? 'text-meta-3' : 'text-meta-5'
          } `}
        >
          {rate}

          {levelUp ? (
            <span className="material-icons-outlined text-[#10b981] text-[18px]">
              arrow_upward
            </span>
          ) : (
            <span className="material-icons-outlined text-[#259ae6] text-[18px]">
              arrow_downward
            </span>
          )}
        </span>
      </div>
    </motion.div>
  );
}
