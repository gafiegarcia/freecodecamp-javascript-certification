const projectStatus = {
  PENDING: { description: "Pending Execution" },
  SUCCESS: { description: "Executed Successfully" },
  FAILURE: { description: "Execution Failed" }
}

class ProjectIdea {
  constructor(title, description) {
    this.title = title;
    this.description = description;
    this.status = projectStatus.PENDING;
  }

  updateProjectStatus(newStatus) {
    this.status = newStatus;
    return this;
  }
}

class ProjectIdeaBoard {
  constructor(title) {
    this.title = title;
    this.ideas = [];
  }

  pin(idea) {
    if (this.ideas.includes(idea)) return;
    this.ideas.push(idea);
  }

  unpin(idea) {
    const ideaIndex = this.ideas.indexOf(idea);
    
    if (ideaIndex === -1) return;
    this.ideas.splice(ideaIndex, 1);
  }

  count() {
    return this.ideas.length;
  }

  formatToString() {
    let result = `${this.title} has ${this.ideas.length} idea(s)\n`;

    if (this.ideas.length) {
      this.ideas.forEach((idea) => {
        result += `${idea.title} (${idea.status.description}) - ${idea.description}\n`;
      })
    }

    return result;
  }
}

// tests

console.log(new ProjectIdea("Fitness Tracker App", "An app that tracks user workouts, diet, and sleep patterns.").updateProjectStatus(projectStatus.SUCCESS))

console.log(new ProjectIdeaBoard("Empty Board").formatToString());