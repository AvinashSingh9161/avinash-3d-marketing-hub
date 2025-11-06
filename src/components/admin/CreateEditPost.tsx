import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Image as ImageIcon, Calendar as CalendarIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface CreateEditPostProps {
  postId: string | null;
  onClose: () => void;
  userId: string;
}

export const CreateEditPost = ({ postId, onClose, userId }: CreateEditPostProps) => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [categoryId, setCategoryId] = useState<string>("");
  const [tags, setTags] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [authorName, setAuthorName] = useState("John Doe");
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [scheduledDate, setScheduledDate] = useState<Date>();
  const [scheduledTime, setScheduledTime] = useState("12:00");
  const { toast } = useToast();

  useEffect(() => {
    loadCategories();
    loadAuthorName();
  }, []);

  const loadCategories = async () => {
    try {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name");
      
      if (error) throw error;
      setCategories(data || []);
    } catch (error: any) {
      console.error("Error loading categories:", error);
    }
  };

  const loadAuthorName = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", userId)
        .single();
      
      if (data?.full_name) {
        setAuthorName(data.full_name);
      }
    } catch (error: any) {
      console.error("Error loading author name:", error);
    }
  };

  useEffect(() => {
    if (postId) {
      loadPost();
    }
  }, [postId]);

  const loadPost = async () => {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("id", postId)
        .single();

      if (error) throw error;

      setTitle(data.title);
      setSlug(data.slug);
      setExcerpt(data.excerpt || "");
      setContent(data.content);
      setFeaturedImage(data.featured_image || "");
      setPublished(data.published);
      setCategoryId(data.category_id || "");
      
      if (data.scheduled_publish_at) {
        const scheduledDateTime = new Date(data.scheduled_publish_at);
        setScheduledDate(scheduledDateTime);
        setScheduledTime(format(scheduledDateTime, "HH:mm"));
      }
    } catch (error: any) {
      toast({
        title: "Error loading post",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!postId) {
      setSlug(generateSlug(value));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a JPEG, PNG, GIF, or WebP image.",
        variant: "destructive",
      });
      e.target.value = ''; // Reset file input
      return;
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB.",
        variant: "destructive",
      });
      e.target.value = ''; // Reset file input
      return;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${userId}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("blog-images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("blog-images")
        .getPublicUrl(filePath);

      setFeaturedImage(data.publicUrl);
      toast({
        title: "Image uploaded",
        description: "Featured image uploaded successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Upload error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      toast({
        title: "Category name required",
        description: "Please enter a category name.",
        variant: "destructive",
      });
      return;
    }

    try {
      const slug = generateSlug(newCategoryName);
      const { data, error } = await supabase
        .from("categories")
        .insert([{ name: newCategoryName, slug }])
        .select()
        .single();

      if (error) throw error;

      setCategories([...categories, data]);
      setCategoryId(data.id);
      setNewCategoryName("");
      setIsAddingCategory(false);
      
      toast({
        title: "Category added",
        description: "New category has been created successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error adding category",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleSave = async (shouldPublish?: boolean, shouldSchedule?: boolean) => {
    if (!title || !content || !slug) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Validate scheduled date if scheduling
    if (shouldSchedule && !scheduledDate) {
      toast({
        title: "Schedule date required",
        description: "Please select a date and time to schedule the post.",
        variant: "destructive",
      });
      return;
    }

    const isPublished = shouldPublish !== undefined ? shouldPublish : published;
    
    // Combine scheduled date and time
    let scheduledPublishAt = null;
    if (shouldSchedule && scheduledDate) {
      const [hours, minutes] = scheduledTime.split(':');
      const combined = new Date(scheduledDate);
      combined.setHours(parseInt(hours), parseInt(minutes), 0, 0);
      
      // Validate that scheduled time is in the future
      if (combined <= new Date()) {
        toast({
          title: "Invalid schedule time",
          description: "Scheduled time must be in the future.",
          variant: "destructive",
        });
        return;
      }
      
      scheduledPublishAt = combined.toISOString();
    }

    setLoading(true);
    try {
      const postData = {
        title,
        slug,
        excerpt,
        content,
        featured_image: featuredImage || null,
        published: isPublished,
        author_id: userId,
        category_id: categoryId || null,
        published_at: isPublished ? new Date().toISOString() : null,
        scheduled_publish_at: scheduledPublishAt,
      };

      if (postId) {
        const { error } = await supabase
          .from("blog_posts")
          .update(postData)
          .eq("id", postId);

        if (error) throw error;

        const successMessage = shouldSchedule 
          ? "Post scheduled successfully."
          : "Post updated successfully.";
        
        toast({
          title: "Post updated",
          description: successMessage,
        });
      } else {
        const { error } = await supabase
          .from("blog_posts")
          .insert([postData]);

        if (error) throw error;

        const successMessage = shouldSchedule 
          ? "Post scheduled successfully."
          : "Post created successfully.";
        
        toast({
          title: "Post created",
          description: successMessage,
        });
      }

      onClose();
    } catch (error: any) {
      toast({
        title: "Error saving post",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onClose}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <h1 className="text-2xl font-bold">
                {postId ? "Edit Post" : "Create New Post"}
              </h1>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => handleSave(false, false)}
                disabled={loading}
              >
                Save Draft
              </Button>
              <Button 
                variant="secondary"
                onClick={() => handleSave(false, true)}
                disabled={loading}
              >
                {loading ? "Scheduling..." : "Schedule"}
              </Button>
              <Button 
                onClick={() => handleSave(true, false)}
                disabled={loading}
              >
                {loading ? "Publishing..." : "Publish Now"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Editor Area */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <Input
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Blog Title"
                className="text-2xl font-semibold h-14 border-0 px-0 focus-visible:ring-0 placeholder:text-muted-foreground/50"
              />
            </div>

            <div className="border rounded-lg overflow-hidden bg-card">
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                modules={modules}
                placeholder="Start writing your amazing blog post here..."
                className="min-h-[500px] [&_.ql-editor]:min-h-[500px] [&_.ql-toolbar]:border-b [&_.ql-toolbar]:bg-muted/30 [&_.ql-container]:border-0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Input
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Brief description of the post (optional)"
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label>Featured Image</Label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="hidden"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  {featuredImage ? (
                    <div className="space-y-4">
                      <img 
                        src={featuredImage} 
                        alt="Featured" 
                        className="max-h-64 mx-auto rounded-lg object-cover"
                      />
                      <p className="text-sm text-muted-foreground">
                        Click to change image
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        {uploading ? "Uploading..." : "Click to upload featured image"}
                      </p>
                    </div>
                  )}
                </label>
              </div>
            </div>
          </div>

          {/* Sidebar - Post Settings */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <div className="border rounded-lg p-6 bg-card space-y-6">
                <h3 className="font-semibold text-lg">Post Settings</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    value={authorName}
                    disabled
                    className="bg-muted"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  {!isAddingCategory ? (
                    <>
                      <Select value={categoryId} onValueChange={setCategoryId}>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsAddingCategory(true)}
                        className="w-full mt-2"
                      >
                        + Add New Category
                      </Button>
                    </>
                  ) : (
                    <div className="space-y-2">
                      <Input
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        placeholder="Enter category name"
                        onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={handleAddCategory}
                          className="flex-1"
                        >
                          Add
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setIsAddingCategory(false);
                            setNewCategoryName("");
                          }}
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="Add tags, separated by commas"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">URL Slug</Label>
                  <Input
                    id="slug"
                    value={slug}
                    onChange={(e) => setSlug(generateSlug(e.target.value))}
                    placeholder="post-url-slug"
                    className="font-mono text-sm"
                  />
                </div>

                <div className="pt-4 border-t space-y-4">
                  <h4 className="font-semibold text-sm">Schedule Publishing</h4>
                  
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !scheduledDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {scheduledDate ? format(scheduledDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={scheduledDate}
                          onSelect={setScheduledDate}
                          disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
                      className="w-full"
                    />
                  </div>

                  {scheduledDate && (
                    <p className="text-sm text-muted-foreground">
                      Post will be published on {format(scheduledDate, "PPP")} at {scheduledTime}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};