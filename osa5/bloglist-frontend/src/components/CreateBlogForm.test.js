import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import CreateBlogForm from "./CreateBlogForm";
import blogService from "../services/blogs";

jest.mock("../services/blogs");

test("event handler works on form submission", async () => {
const newBlog = {
    title: "testtitle",
    author: "testauthor",
    url: "testurl",
    likes: 0,
};

blogService.create.mockResolvedValue(newBlog);
const component = render(<CreateBlogForm />);
const titleInput = component.container.querySelector('input[name="Blogname"]');
const authorInput = component.container.querySelector('input[name="Blogauthor"]');
const urlInput = component.container.querySelector('input[name="BlogURL"]');
const form = component.container.querySelector("form");
fireEvent.change(titleInput, { target: { value: newBlog.title } });
fireEvent.change(authorInput, { target: { value: newBlog.author } });
fireEvent.change(urlInput, { target: { value: newBlog.url } });

fireEvent.submit(form);

await new Promise((resolve) => setTimeout(resolve, 0))

expect(blogService.create.mock.calls).toHaveLength(1);
expect(blogService.create.mock.calls[0][0]).toEqual(newBlog);
})