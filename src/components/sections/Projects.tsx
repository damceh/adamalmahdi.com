'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Project } from '@/types';

interface ProjectsProps {
  projects: Project[];
  className?: string;
}

export function ProjectsSection({ projects, className }: ProjectsProps) {
  return (
    <section className={`py-12 px-6 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-16 text-foreground"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Featured Projects
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <Card className="bg-card/80 backdrop-blur-sm border-border hover:bg-card transition-all duration-300 group h-full flex flex-col card-hover">
                <CardContent className="p-0 flex flex-col h-full">
                  <div className="aspect-video bg-muted rounded-t-lg flex items-center justify-center flex-shrink-0">
                    <div className="text-muted-foreground">Project Preview</div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-semibold text-foreground">{project.title}</h3>
                      {project.featured && (
                        <Badge variant="secondary" className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20">
                          Featured
                        </Badge>
                      )}
                      {project.status === 'in-progress' && (
                        <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20">
                          In Progress
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-card-foreground mb-4 leading-relaxed flex-grow">{project.description}</p>
                    
                    {/* Category */}
                    <div className="mb-4">
                      <Badge variant="outline" className="border-border text-muted-foreground text-xs">
                        {project.category}
                      </Badge>
                    </div>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4 min-h-[2.5rem]">
                      {project.technologies?.map((tech) => (
                        <Badge 
                          key={tech} 
                          variant="outline" 
                          className="border-border text-card-foreground hover:border-muted-foreground text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-auto">
                      {project.demoUrl && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-border text-card-foreground hover:bg-muted"
                          asChild
                        >
                          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Demo
                          </a>
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-border text-card-foreground hover:bg-muted"
                          asChild
                        >
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 mr-2" />
                            Code
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}