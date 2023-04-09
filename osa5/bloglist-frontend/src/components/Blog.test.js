import React from "react"
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from "./Blog"

test('default only title and author are displayed', () => {
    const blog = {
        title: 'testtitle',
        author: 'testauthor',
        url: 'testurl',
        likes: 10
    }
    const getAllBlogs = jest.fn()
    const token = 'testtoken'
    const component = render(
        <Blog blog={blog} token={token} getAllBlogs={getAllBlogs} />
    )

    expect(component.container).toHaveTextContent(`${blog.title}`)
    expect(component.container).toHaveTextContent(`${blog.author}`)
    expect(component.container.querySelector('#blogshown')).not.toBeVisible()

})

test('display url and likes when clicking show', () => {
    const getAllBlogs = jest.fn()
    const blog = {
        title: 'testtitle',
        author: 'testauthor',
        url: 'testurl',
        likes: 10
    }
    const token='testtoken'
    const component = render(
        <Blog blog={blog} getAllBlogs={getAllBlogs} token={token} />
    )
    const button = component.getByText('show')
    fireEvent.click(button)

    expect(component.container.querySelector('#blogshown')).toBeVisible()
})

test('event handler is called when like button is clicked', () => {
    const getAllBlogs = jest.fn()
    const blog = {
        title: 'testtitle',
        author: 'testauthor',
        url: 'testurl',
        likes: 10,
        user: {
            username: 'testname' 
        }
    }
    const token='testtoken'
    const component = render(
        <Blog blog={blog} getAllBlogs={getAllBlogs} token={token} />
    )

    const showButton = component.getByText('show')
    fireEvent.click(showButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(getAllBlogs.mock.calls).toHaveLength(2) 
})