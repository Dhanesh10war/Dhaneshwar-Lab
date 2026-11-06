import React, { useState } from 'react';
import { BentoCard } from './BentoCard';
import { PROJECTS } from '../data/portfolio-data';
import { ProjectItem, Category } from '../types';

interface BentoGridProps {
  onSelectProject: (project: ProjectItem) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
}

export const BentoGrid: React.FC<BentoGridProps> = ({
  onSelectProject,
  selectedCategory,
  onCategoryChange,
}) => {
  const categories: { id: Category; label: string }[] = [
    { id: 'all', label: 'All Items' },
    { id: 'products', label: 'Products' },
    { id: 'works', label: 'Client Works' },
    { id: 'designs', label: 'Design Systems' },
  ];

  const filteredProjects = PROJECTS.filter((p) => {
    if (selectedCategory === 'all' || !['products', 'works', 'designs'].includes(selectedCategory)) {
      return true;
    }
    return p.category === selectedCategory;
  });

  return (
    <section id="showcase" className="py-24 px-6 max-w-6xl mx-auto">
      {/* Header and Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="text-xs uppercase font-bold tracking-widest text-[#86868b] mb-2">
            Selected Portfolio
          </div>
          <h2 className="headline-title text-white">
            Works, Products & Designs.
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#161618] border border-white/[0.08] self-start md:self-auto overflow-x-auto">
          {categories.map((c) => {
            const isActive = selectedCategory === c.id || (selectedCategory === 'all' && c.id === 'all');
            return (
              <button
                key={c.id}
                onClick={() => onCategoryChange(c.id)}
                className={`apple-pressable px-4 py-1.5 rounded-full text-xs font-medium tracking-tight whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-white text-black font-semibold'
                    : 'text-[#86868b] hover:text-white'
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Asymmetric Bento Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, idx) => (
          <BentoCard
            key={project.id}
            project={project}
            onSelect={onSelectProject}
            isLarge={project.featured && idx === 0}
            isWide={selectedCategory === 'all' && idx === 2}
          />
        ))}
      </div>
    </section>
  );
};
