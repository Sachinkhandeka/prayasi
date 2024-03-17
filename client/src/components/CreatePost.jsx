import { Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CreatePost() {
    return (
        <div className="p-3 max-w-3xl mx-auto min-h-screen" >
            <p className="text-center leading-5 mt-7 font-mono text-gray-500 dark:text-teal-500">"Writing is the painting of the voice."</p>
            <h1 className="text-center text-3xl my-7 font-semibold underline" >Create a Post</h1> 
            <form className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 sm:flex-row justify-between">
                    <TextInput type="text" placeholder="Title" required id="title" className="flex-1"/>
                    <Select>
                        <option value="uncategorized">Select a category</option>
                        <option value="technology">Technology</option>
                        <option value="travel">Travel</option>
                        <option value="health">Health and Wellness</option>
                        <option value="food">Food and Recipes</option>
                        <option value="fashion">Fashion and Beauty</option>
                        <option value="finance">Finance and Money Managment</option>
                        <option value="art">Arts and Culture</option>
                        <option value="education">Education and Learning</option>
                        <option value="environment">Environment and Sustainability</option>
                    </Select>
                </div>
                <div className="flex items-center gap-4 justify-between border-4 border-teal-500 border-dotted p-3">
                    <FileInput type="file" accept="image/*" />
                    <Button type="button" gradientDuoTone={"tealToLime"} size={"sm"} outline>Upload image</Button>
                </div>
                <ReactQuill theme="snow" placeholder="Write something here" className="h-72 mb-12" required/>
                <Button type="submit" gradientDuoTone={"pinkToOrange"} outline >Publish</Button>
            </form>    
        </div>
    )
}