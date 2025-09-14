export class CanvasService {
  constructor() {
    this.CANVAS_API_BASE_URL = import.meta.env.VITE_CANVAS_API_URL;
    this.CANVAS_API_TOKEN = import.meta.env.VITE_CANVAS_API_TOKEN;
    
    console.log('Canvas API URL from env:', this.CANVAS_API_BASE_URL);
    console.log('Canvas API Token from env:', this.CANVAS_API_TOKEN ? 'Token exists' : 'No token');
    
    this.isConfigured = !!(this.CANVAS_API_BASE_URL && this.CANVAS_API_TOKEN);
    
    if (!this.isConfigured) {
      console.log('Canvas API is not configured. Canvas features will be disabled.');
    } else {
      console.log('Canvas API is configured successfully.');
    }
  }

  async fetchTodoItems() {
    if (!this.isConfigured) {
      return [];
    }
    try {
      const url = new URL('/canvas-api/users/self/todo', window.location.origin);
      console.log('Fetching Canvas todos from:', url.toString());
      console.log('Using token:', this.CANVAS_API_TOKEN.substring(0, 10) + '...');
      
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.CANVAS_API_TOKEN}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': window.location.origin
        },
        credentials: 'include'
      });

      console.log('Canvas API response status:', response.status);
      console.log('Canvas API response headers:', Object.fromEntries(response.headers.entries()));
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Canvas API error response:', errorText);
        throw new Error(`Canvas API error: ${response.status} ${response.statusText}. ${errorText}`);
      }

      if (!response.ok) {
        throw new Error(`Canvas API error: ${response.statusText}`);
      }

      const todos = await response.json();
      
      // Transform Canvas todos into our goal format
      return todos.map(todo => ({
        id: `canvas-${todo.assignment.id}`,
        title: todo.assignment.name,
        description: `Due: ${new Date(todo.assignment.due_at).toLocaleDateString()}`,
        duration: 30, // Default duration in minutes
        source: 'canvas',
        canvasAssignmentId: todo.assignment.id,
        courseId: todo.course_id,
        dueDate: todo.assignment.due_at,
        pointsPossible: todo.assignment.points_possible
      }));
    } catch (error) {
      console.error('Error fetching Canvas todos:', error);
      throw error;
    }
  }

  async fetchCourses() {
    if (!this.isConfigured) {
      return [];
    }
    try {
      const response = await fetch(`${this.CANVAS_API_BASE_URL}/courses?enrollment_state=active`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.CANVAS_API_TOKEN}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        mode: 'cors'
      });

      if (!response.ok) {
        throw new Error(`Canvas API error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching Canvas courses:', error);
      throw error;
    }
  }

  async markAssignmentAsSubmitted(assignmentId) {
    if (!this.isConfigured) {
      return;
    }
    try {
      const response = await fetch(`${this.CANVAS_API_BASE_URL}/assignments/${assignmentId}/submissions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.CANVAS_API_TOKEN}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify({
          submission: {
            submitted_at: new Date().toISOString()
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Canvas API error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error marking assignment as submitted:', error);
      throw error;
    }
  }
}