export const blogPosts = [
  {
    id: 1,
    slug: 'building-this-portfolio',
    title: 'Building This Portfolio',
    date: 'Ongoing',
    description:
      'Notes on how this React + Vite portfolio is put together—from GSAP animations to 3D scenes with React Three Fiber.',
    content: `# Building This Portfolio

This portfolio is an ongoing project showcasing modern web technologies and creative approaches to personal branding.

## Tech Stack

- **Frontend Framework**: React 19 with Vite
- **3D Rendering**: React Three Fiber with Three.js
- **Animations**: GSAP for DOM animations and React Three Fiber for 3D animations
- **Styling**: Tailwind CSS
- **Routing**: React Router v7
- **Model Assets**: GLTF models created with Blender and converted using gltfjsx

## Architecture

### Component Structure

The portfolio is organized into three main levels:

1. **Pages** (\`src/pages/*\`) - Route-level wrappers that compose sections
2. **Sections** (\`src/sections/*\`) - Larger page sections with multiple components
3. **Components** (\`src/components/*\`) - Reusable UI pieces and 3D scene components

### 3D Implementation

3D models are loaded using React Three Fiber and pre-optimized with:
- \`SkeletonUtils.clone()\` for animated models
- \`useAnimations()\` hook for animation lifecycle management
- \`frustumCulled = false\` to prevent animation clipping issues

### Styling Approach

The portfolio combines:
- Tailwind utility classes for responsive design
- Custom CSS in \`src/index.css\` for global styles
- Inline styles for dynamic animations

## Key Learnings

### Three.js & React Three Fiber

Working with R3F taught me the importance of understanding Three.js fundamentals:
- Camera positioning and viewing frustum
- Lighting for realistic renders
- Model optimization for web performance
- Animation state management

### Performance Considerations

- Model preloading with \`useGLTF.preload()\`
- Lazy loading of heavy components
- Vite's built-in code splitting
- Tailwind's PurgeCSS for smaller CSS bundles

### Animation Orchestration

Combining GSAP and R3F animations required careful timing:
- Using callbacks to synchronize transitions
- Managing animation states across multiple systems
- Leveraging React hooks for clean animation lifecycle

## Future Improvements

- [ ] Add more blog posts with deep dives
- [ ] Optimize 3D models further
- [ ] Implement dark/light mode toggle
- [ ] Add search functionality for blog posts
- [ ] Create project case studies

---

Check back often as this portfolio and blog continue to evolve!
`,
  },
  {
    id: 2,
    slug: 'opengl-light-simulation',
    title: 'Small OpenGL Light Simulation',
    date: 'Project Deep Dive',
    description:
      'A closer look at the Phong lighting demo: ambient, diffuse, and specular lighting with an interactive camera and ImGui controls.',
    content: `# Small OpenGL Light Simulation

This project explores fundamental lighting concepts in computer graphics through an interactive OpenGL application.

## Project Overview

A real-time 3D scene demonstrating the **Phong Reflection Model**, one of the most widely used lighting models in computer graphics.

## The Phong Model

The Phong model combines three types of light reflection:

### 1. Ambient Light

The simplest component—uniform lighting from all directions.

\`\`\`glsl
vec3 ambient = ambientStrength * lightColor;
\`\`\`

This ensures no parts of the scene are completely black, even when not directly lit.

### 2. Diffuse Reflection

Light scattered equally in all directions, creating a matte surface effect.

\`\`\`glsl
float diff = max(dot(norm, lightDir), 0.0);
vec3 diffuse = diff * lightColor;
\`\`\`

The dot product of the surface normal and light direction determines intensity.

### 3. Specular Highlights

Shiny reflections that mimic glossy or polished surfaces.

\`\`\`glsl
vec3 reflectDir = reflect(-lightDir, norm);
float spec = pow(max(dot(viewDir, reflectDir), 0.0), shininess);
vec3 specular = spec * lightColor;
\`\`\`

The shininess factor controls how sharp or blurry the highlight is.

## Implementation Details

### Camera Control

Interactive mouse and keyboard controls allow exploration of the scene:
- **Mouse**: Rotate view
- **WASD**: Move through scene
- **Scroll**: Zoom in/out

### ImGui Integration

A user-friendly GUI provides real-time control over:
- Light color and position
- Material properties (ambient, diffuse, specular coefficients)
- Shininess factor
- Background color

This allows immediate visual feedback when tweaking parameters.

### Shader Architecture

The lighting calculations happen in the **fragment shader**, calculated per-pixel for smooth gradients:

\`\`\`glsl
#version 330 core

in vec3 FragPos;
in vec3 Normal;

uniform vec3 lightPos;
uniform vec3 viewPos;
uniform vec3 lightColor;

out vec4 FragColor;

void main() {
    // Normalize for per-pixel lighting
    vec3 norm = normalize(Normal);
    vec3 lightDir = normalize(lightPos - FragPos);
    vec3 viewDir = normalize(viewPos - FragPos);
    
    // Calculate all three components
    vec3 ambient = 0.1 * lightColor;
    
    float diff = max(dot(norm, lightDir), 0.0);
    vec3 diffuse = diff * lightColor;
    
    vec3 reflectDir = reflect(-lightDir, norm);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);
    vec3 specular = spec * lightColor;
    
    vec3 result = (ambient + diffuse + specular) * objectColor;
    FragColor = vec4(result, 1.0);
}
\`\`\`

## What Went Well

✅ **Real-time responsiveness** - ImGui updates feel snappy
✅ **Clear visual feedback** - Changes are immediately visible
✅ **Good educational value** - The separation of lighting components is clear
✅ **Extensible** - Easy to add new materials or light sources

## Challenges & Solutions

### Issue: Shading Artifacts

**Problem**: Visible facets on low-poly models
**Solution**: Increased geometry or used smooth normals from higher-poly bake

### Issue: Light Flickering

**Problem**: Camera movement caused erratic highlights
**Solution**: Normalized all vectors in fragment shader

### Issue: GUI Overlap

**Problem**: ImGui covering important parts of the scene
**Solution**: Made GUI draggable and resizable

## Key Takeaways

1. **Lighting is fundamental** - Good lighting can make simple geometry look amazing
2. **Per-pixel calculations matter** - Fragment shaders are worth optimizing
3. **User feedback loops are crucial** - ImGui made iteration much faster
4. **Math foundations matter** - Understanding dot products and reflections is essential

## Technical Specs

- **Graphics API**: OpenGL 3.3 core
- **Language**: C++17
- **Dependencies**: GLFW, GLEW, GLM, ImGui
- **Model Format**: OBJ files
- **Frame Rate**: 60+ FPS on most hardware

---

This project proved to be an excellent foundation for understanding more complex rendering techniques!
`,
  },
  {
    id: 3,
    slug: 'game-off-2025-sinful-waves',
    title: 'Game Off 2025: Sinful Waves',
    date: 'Game Jam Retrospective',
    description:
      'Thoughts on building Sinful Waves, a collaborative game jam submission, and what went well (and what didn\'t).',
    content: `# Game Off 2025: Sinful Waves

A retrospective on our Game Off 2025 submission—a submarine-based puzzle-adventure game built in just 48 hours.

## The Concept

**Sinful Waves** is a narrative-driven puzzle adventure where you pilot a submarine through mysterious waters, encountering ancient civilizations and solving environmental puzzles.

### Core Mechanics

- **Submarine Navigation**: Point-and-click movement through underwater environments
- **Resource Management**: Limited oxygen and power for equipment
- **Environmental Puzzles**: Solve environmental challenges to progress
- **Dialogue System**: Interact with NPCs to uncover the story

## What Went Well ✅

### 1. Team Coordination

Despite being geographically distributed, our team of 4 stayed synchronized:
- Daily standups at fixed times
- Shared Git repository with clear branching strategy
- Discord for real-time communication
- Trello board for task tracking

**Outcome**: Minimal merge conflicts and smooth collaboration

### 2. Art Direction

Our artist created a cohesive underwater aesthetic:
- Hand-drawn sprite characters
- Painted water effects
- Consistent color palette
- Atmospheric particle effects

**Outcome**: The game feels polished and thematic

### 3. Core Gameplay Loop

The puzzle progression felt natural:
- Tutorials teach mechanics in-game
- Puzzles build on each other
- Environmental storytelling reinforces narrative
- Clear feedback on player actions

**Outcome**: Players understood mechanics intuitively

## What We'd Do Differently ⚠️

### 1. Scope Creep

**Issue**: We designed too many locations and puzzles (8 when we could only finish 4)

**Solution for Next Time**: 
\`\`\`
Daily scope check-ins
- 3 must-haves
- 3 nice-to-haves  
- 3 stretch goals
Cut anything outside the first category
\`\`\`

### 2. Engine Selection

**Issue**: Chose Godot 4 (unfamiliar to some) instead of Unity

**Lesson**: For game jams, use what you know, not what sounds cool

### 3. Audio

**Issue**: Audio was an afterthought; we had 2 hours left for sound design

**Solution**: Start with placeholder audio immediately
- Use free SFX libraries early (Freesound.org, OpenGameArt)
- Leave audio task for the final 8 hours minimum

## Technical Highlights

### Dialogue System

Built a lightweight dialogue parser to separate content from code:

\`\`\`gdscript
# dialogue.gd
{
  "scene_1": [
    {
      "character": "Captain",
      "text": "The pressure is rising...",
      "choices": [
        {"text": "Check gauges", "next": "check_pressure"},
        {"text": "Ignore it", "next": "scene_2"}
      ]
    }
  ]
}
\`\`\`

**Benefit**: Non-programmers could write dialogue without touching code

### Puzzle State Machine

Each puzzle was a state machine:

\`\`\`
LOCKED → ACTIVE → SOLVED → REWARD_GIVEN
\`\`\`

**Benefit**: Easy to debug puzzle progression; no mysterious broken states

### Resource System

Simple but effective resource tracking:

\`\`\`gdscript
class_name Resources
var oxygen: float = 100.0
var power: float = 100.0

func deplete(resource: String, amount: float):
  match resource:
    "oxygen": oxygen -= amount
    "power": power -= amount
  _check_failure()
\`\`\`

## Statistics

| Metric | Value |
|--------|-------|
| Development Time | 48 hours |
| Team Size | 4 people |
| Lines of Code | ~3,500 GDScript |
| Scenes | 6 complete, 2 partial |
| Art Assets | 47 unique sprites |
| Playtime | ~25-30 minutes |

## Final Submission

**Final Score**: 8.2/10 (Community voted)

**Judge Feedback**:
- ⭐ Excellent atmosphere and visual consistency
- ⭐ Compelling narrative hook
- ⚠️ Some puzzles felt disconnected
- ⚠️ Final area felt rushed

## Key Learnings

### 1. Constraints Drive Creativity

The 48-hour limit forced us to make every feature count. No bloat, no overthinking.

### 2. Communication is 70% of Game Jam Success

A well-coordinated mediocre team beats a brilliant chaotic team.

### 3. Always Have a Vertical Slice

By hour 12, we had one fully working puzzle with art, sound, and dialogue. This became our North Star for quality.

### 4. Post-Jam is Part of the Fun

The community voting and feedback period was as rewarding as the development.

## For the Next Jam...

- **Tool**: Stick with familiar engines
- **Asset**: Start with art/sound from day 1
- **Scope**: 1 hour planning, 40 hours execution, 7 hours polish
- **Team**: Same team if possible—we had great chemistry

---

**Would we do it again?** Absolutely. Sinful Waves taught us more in 48 hours than a month of solo development could have.
`,
  },
];
