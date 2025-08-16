import React from 'react';
import TimelineCard from './TimelineCard';
import { timelineData } from '../data/timeline';

const Timeline: React.FC = () => {
  return (
    <section id="ventures" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Timeline</h2>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Line - calculated height based on items */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gray-600" style={{ height: `${timelineData.length * 16 - 4}rem` }}></div>

          {/* Timeline Items */}
          <div className="space-y-0">
            {timelineData.map((item, index) => (
              <TimelineCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;