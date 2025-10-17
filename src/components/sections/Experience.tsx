'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Experience } from '@/types';

interface ExperienceProps {
  experiences: Experience[];
  className?: string;
}

const EXPERIENCES_TO_SHOW = 3;

export function ExperienceSection({ experiences, className }: ExperienceProps) {
  const [showAll, setShowAll] = useState(false);
  const [expandedResponsibilities, setExpandedResponsibilities] = useState<Set<string>>(new Set());
  
  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const toggleResponsibilities = (id: string) => {
    const newExpanded = new Set(expandedResponsibilities);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedResponsibilities(newExpanded);
  };

  const isExpanded = (id: string) => expandedResponsibilities.has(id);

  const experiencesToShow = showAll
    ? experiences
    : experiences.slice(0, EXPERIENCES_TO_SHOW);

  return (
    <section className={`py-12 px-6 ${className}`}>
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-16 text-foreground"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Professional Experience
        </motion.h2>
        
        <div className="space-y-8">
          <AnimatePresence>
            {experiencesToShow.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{
                  delay: showAll ? (index < EXPERIENCES_TO_SHOW ? index * 0.2 : 0.1) : index * 0.2,
                  duration: 0.6
                }}
                viewport={{ once: true }}
              >
              <Card className="bg-card/80 backdrop-blur-sm border-border hover:bg-card transition-all duration-300 card-hover">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {exp.logo ? (
                        <Image
                          src={exp.logo}
                          alt={`${exp.company} logo`}
                          width={64}
                          height={64}
                          className="w-full h-full object-contain p-2"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-muted-foreground/20 rounded"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold text-foreground">{exp.company}</h3>
                        {exp.type === 'full-time' && new Date().getFullYear() === new Date(exp.period.split(' - ')[1] || '').getFullYear() && (
                          <Badge variant="secondary" className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20">
                            Current
                          </Badge>
                        )}
                      </div>
                      <p className="text-card-foreground font-medium mb-1">{exp.position}</p>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                        <Calendar className="w-4 h-4" />
                        {exp.period}
                        {exp.location && (
                          <>
                            <span className="mx-2">•</span>
                            <span>{exp.location}</span>
                          </>
                        )}
                      </div>
                      <p className="text-card-foreground leading-relaxed mb-4">{exp.description}</p>
                      
                      {/* Technologies */}
                      {exp.technologies && exp.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {exp.technologies.map((tech) => (
                            <Badge
                              key={tech}
                              variant="outline"
                              className="border-border text-card-foreground hover:border-muted-foreground text-xs"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      )}
                    
                      {/* Responsibilities */}
                      {exp.responsibility && exp.responsibility.length > 0 && (
                        <div className="mt-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-sm font-medium text-foreground">Key Responsibilities:</h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleResponsibilities(exp.id)}
                              className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                            >
                              {isExpanded(exp.id) ? (
                                <ChevronUp className="w-4 h-4" />
                              ) : (
                                <ChevronDown className="w-4 h-4" />
                              )}
                            </Button>
                          </div>
                          <AnimatePresence>
                            {isExpanded(exp.id) && (
                              <motion.ul
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-1 overflow-hidden"
                              >
                                {exp.responsibility.map((task, idx) => (
                                  <li key={idx} className="text-sm text-card-foreground flex items-start gap-2">
                                    <span className="text-muted-foreground/60 mt-1.5 flex-shrink-0">•</span>
                                    <span>{task}</span>
                                  </li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                          {!isExpanded(exp.id) && (
                            <p className="text-xs text-muted-foreground italic">
                              {exp.responsibility.length} responsibilities - click to expand
                            </p>
                          )}
                        </div>
                      )}

                      {/* Achievements (for future use) */}
                      {exp.achievements && exp.achievements.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-foreground mb-2">Key Achievements:</h4>
                          <ul className="space-y-1">
                            {exp.achievements.map((achievement, idx) => (
                              <li key={idx} className="text-sm text-card-foreground flex items-start gap-2">
                                <span className="text-green-600 dark:text-green-400 mt-1.5 flex-shrink-0">★</span>
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
          </AnimatePresence>
          
          {/* Show More/Less Button */}
          {experiences.length > EXPERIENCES_TO_SHOW && (
            <div className="flex justify-center mt-8">
              <Button
                onClick={toggleShowAll}
                variant="outline"
                className="flex items-center gap-2 border-border text-card-foreground hover:bg-muted hover:text-foreground"
              >
                {showAll ? (
                  <>
                    <ChevronUp className="w-4 h-4" />
                    Show Less Experiences
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    Show All Experiences ({experiences.length - EXPERIENCES_TO_SHOW} more)
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}