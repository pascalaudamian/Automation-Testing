"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface User {
  id: number;
  name: string;
  email: string;
}

export default function AjaxPage() {
  const { toast } = useToast();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [postLoading, setPostLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [submittedData, setSubmittedData] = useState<Record<string, unknown> | null>(null);
  const [delayedLoading, setDelayedLoading] = useState(false);
  const [delayedData, setDelayedData] = useState<string | null>(null);

  // Fetch posts on initial load
  useEffect(() => {
    fetchPosts();
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  // Fetch posts from JSONPlaceholder API
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch posts. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single post
  const fetchPost = async (id: number) => {
    setPostLoading(true);
    setSelectedPost(null);
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
      const data = await response.json();
      setSelectedPost(data);
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to fetch post ${id}. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setPostLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.body) {
      toast({
        title: "Validation Error",
        description: "Please fill out all fields",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify({
          title: formData.title,
          body: formData.body,
          userId: 1,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      const data = await response.json();
      setSubmittedData(data);

      toast({
        title: "Success",
        description: "Post created successfully!",
      });

      // Reset form
      setFormData({ title: "", body: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle search
  const handleSearch = async () => {
    if (!searchTerm) return;

    setSearching(true);
    setSearchResults([]);

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users?q=${searchTerm}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to search. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSearching(false);
    }
  };

  // Handle delayed request
  const handleDelayedRequest = async () => {
    setDelayedLoading(true);
    setDelayedData(null);

    try {
      // Simulating a slow API call
      const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");

      // Artificial delay
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const data = await response.json();
      setDelayedData(data.title);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch delayed data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDelayedLoading(false);
    }
  };

  return (
    <div className="space-y-8" data-testid="ajax-page">
      <div>
        <h1 className="text-2xl font-bold tracking-tight" data-testid="page-title">AJAX Requests</h1>
        <p className="text-sm text-zinc-500" data-testid="page-description">
          Practice with asynchronous requests, loading states, and dynamic content.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Data Fetching Card */}
        <Card>
          <CardHeader>
            <CardTitle>Data Fetching</CardTitle>
            <CardDescription>Get data from a remote API</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <Button
                onClick={fetchPosts}
                disabled={loading}
                data-testid="refresh-posts"
              >
                {loading ? "Loading..." : "Refresh Posts"}
              </Button>
            </div>

            <div className="border rounded-md p-4">
              <h3 className="text-sm font-medium mb-2">Posts:</h3>
              {loading ? (
                <div className="py-8 flex justify-center" data-testid="posts-loading">
                  <div className="animate-spin h-6 w-6 border-2 border-zinc-600 border-t-transparent rounded-full" />
                </div>
              ) : posts.length === 0 ? (
                <p className="text-sm text-zinc-500 py-4 text-center" data-testid="no-posts">
                  No posts available. Click "Refresh Posts" to load data.
                </p>
              ) : (
                <div className="space-y-2" data-testid="posts-list">
                  {posts.map((post) => (
                    <div
                      key={post.id}
                      className="p-3 border rounded-md hover:bg-zinc-50 cursor-pointer"
                      onClick={() => fetchPost(post.id)}
                      data-testid={`post-${post.id}`}
                    >
                      <h4 className="font-medium text-sm">{post.title}</h4>
                      <p className="text-xs text-zinc-500 truncate">{post.body}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {selectedPost && (
              <div className="border rounded-md p-4" data-testid="selected-post">
                <h3 className="text-sm font-medium mb-2">Selected Post:</h3>
                <h4 className="text-base font-medium">{selectedPost.title}</h4>
                <p className="text-sm mt-2">{selectedPost.body}</p>
              </div>
            )}

            {postLoading && (
              <div className="border rounded-md p-4 flex justify-center py-8" data-testid="post-loading">
                <div className="animate-spin h-6 w-6 border-2 border-zinc-600 border-t-transparent rounded-full" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Form Submission Card */}
        <Card>
          <CardHeader>
            <CardTitle>Form Submission</CardTitle>
            <CardDescription>Send data to a remote API</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4" data-testid="post-form">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="title">Title</label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  disabled={submitting}
                  placeholder="Enter post title"
                  data-testid="title-input"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="body">Content</label>
                <textarea
                  id="body"
                  name="body"
                  value={formData.body}
                  onChange={handleInputChange}
                  disabled={submitting}
                  className="flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter post content"
                  data-testid="body-input"
                />
              </div>
              <Button
                type="submit"
                disabled={submitting}
                data-testid="submit-button"
              >
                {submitting ? "Submitting..." : "Submit Post"}
              </Button>
            </form>

            {submittedData && (
              <div className="mt-4 border rounded-md p-4 bg-green-50" data-testid="submitted-data">
                <h3 className="text-sm font-medium mb-2">Successfully Submitted:</h3>
                <pre className="text-xs bg-white p-2 rounded border overflow-x-auto">
                  {JSON.stringify(submittedData, null, 2)}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Search Card */}
        <Card>
          <CardHeader>
            <CardTitle>Search API</CardTitle>
            <CardDescription>Search data from a remote API</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-2">
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search users..."
                className="flex-1"
                data-testid="search-input"
              />
              <Button
                onClick={handleSearch}
                disabled={searching || !searchTerm}
                data-testid="search-button"
              >
                {searching ? "Searching..." : "Search"}
              </Button>
            </div>

            <div className="border rounded-md p-4">
              <h3 className="text-sm font-medium mb-2">Search Results:</h3>
              {searching ? (
                <div className="py-8 flex justify-center" data-testid="search-loading">
                  <div className="animate-spin h-6 w-6 border-2 border-zinc-600 border-t-transparent rounded-full" />
                </div>
              ) : searchResults.length === 0 ? (
                <p className="text-sm text-zinc-500 py-4 text-center" data-testid="no-results">
                  No results found. Try searching for something else.
                </p>
              ) : (
                <div className="space-y-2" data-testid="search-results">
                  {searchResults.map((user) => (
                    <div
                      key={user.id}
                      className="p-3 border rounded-md"
                      data-testid={`user-${user.id}`}
                    >
                      <h4 className="font-medium text-sm">{user.name}</h4>
                      <p className="text-xs text-zinc-500">{user.email}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Delayed Request Card */}
        <Card>
          <CardHeader>
            <CardTitle>Delayed Requests</CardTitle>
            <CardDescription>Handle long-running API calls</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <Button
                onClick={handleDelayedRequest}
                disabled={delayedLoading}
                data-testid="delayed-button"
              >
                {delayedLoading ? "Loading (3s)..." : "Fetch Delayed Data"}
              </Button>
            </div>

            <div className="border rounded-md p-4 min-h-24 flex items-center justify-center">
              {delayedLoading ? (
                <div className="flex flex-col items-center" data-testid="delayed-loading">
                  <div className="animate-spin h-6 w-6 border-2 border-zinc-600 border-t-transparent rounded-full mb-2" />
                  <p className="text-sm text-zinc-500">This request takes 3 seconds...</p>
                </div>
              ) : delayedData ? (
                <div className="text-center" data-testid="delayed-data">
                  <h4 className="font-medium">Loaded Data:</h4>
                  <p>{delayedData}</p>
                </div>
              ) : (
                <p className="text-sm text-zinc-500" data-testid="delayed-instructions">
                  Click the button to start a request with a 3-second delay.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
