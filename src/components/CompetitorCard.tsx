import React from 'react';
import { motion } from 'framer-motion';

const CompetitorCard = ({ competitor }: { competitor: any }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="overflow-hidden rounded-lg border border-apple-gray-200 bg-white shadow-sm hover:shadow-md"
    >
      <div className="border-b border-apple-gray-100 bg-apple-gray-50 px-4 py-3">
        <h3 className="font-medium text-apple-gray-500">{competitor.name}</h3>
        <div className="mt-1 flex items-center">
          <span className="rounded-full bg-apple-gray-100 px-2 py-0.5 text-xs font-medium text-apple-gray-500">
            Competitor
          </span>
          <span className="ml-2 text-xs text-apple-gray-300">{new Date().toLocaleDateString()}</span>
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm text-apple-gray-500">
          {competitor.name} Quote: ₹{competitor.quote} (TMT)
        </p>
        <p className="text-sm text-apple-gray-500">
          Difference: ₹{competitor.difference} Savings with {competitor.savingsWith} | {competitor.comparedTo} is {competitor.percentageCostlier}% costlier.
        </p>
        <div className="mt-2">
          <h4 className="text-xs font-medium uppercase text-apple-gray-400">Battle Cards:</h4>
          <ul className="list-disc pl-5 text-sm text-apple-gray-500">
            {competitor.battleCards.map((card: any, index: any) => (
              <li key={index}>{card}</li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default CompetitorCard;