require 'rho/rhotabbar'
require 'rho/rhocontroller'
require 'helpers/browser_helper'

class PictureController < Rho::RhoController
  include BrowserHelper

  def gallery
    
    @pictures = Picture.find(:all)
  end
  
  def editor
    render :layout => false
  end
  
  def start
    tabs = [
      { :label => "Gallery", :icon => '/public/images/gears.png', :action => '/app/Picture/gallery',:reload => true }, 
      { :label => "Editor",  :icon => '/public/images/gears.png', :action => '/app/Picture/editor',:reload => true },
      {:label => "Choose", :icon => '/public/images/gears.png',:action => '/app/Picture/choose',:reload => true},
      {:label => "Take Picture", :icon => '/public/images/gears.png', :action => '/app/Picture/take_picture', :reload => true}
    ]
    Rho::NativeTabbar.remove
    Rho::NativeTabbar.create_vertical(tabs)
    Rho::NativeTabbar.switch_tab(0)
    #fileName = '/public/db-files'
    #File.open(fileName).each do |line|
    #end
    #picture = Picture.create({:uri => "/public/db-files/")
  end

  #GET /Picture
  def index
    @pictures = Picture.find(:all)
    render :back => '/app'
  end

  # GET /Picture/{1}
  def show
    @picture = Picture.find(@params['id'])
    if @picture
      render :action => :show, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # GET /Picture/new
  def new
    @picture = Picture.new
    render :action => :new, :back => url_for(:action => :index)
  end

  # GET /Picture/{1}/edit
  def edit
    @picture = Picture.find(@params['id'])
    if @picture
      render :action => :edit, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # POST /Picture/create
  def create
    @picture = Picture.create(@params['picture'])
    redirect :action => :index
  end

  # POST /Picture/{1}/update
  def update
    @picture = Picture.find(@params['id'])
    @picture.update_attributes(@params['picture']) if @picture
    redirect :action => :index
  end

  # POST /Picture/{1}/delete
  def delete
    @picture = Picture.find($id)
    @picture.destroy if @picture
    
    Rho::NativeTabbar.switch_tab(0)
    render :string => ""
  end
    
    def take_picture
      Camera::take_picture('/app/Picture/camera_callback')
    end
    
    def camera_callback
      status = @params['status']
      
      if (status == 'ok')
        @uri = @params['image_uri']
        
        @uri = Rho::RhoApplication::get_blob_path(@uri)
        @picture = Picture.create({:uri => @uri})
        puts "in the camera callback, the uri is: #{@uri}"
        load_image
      end
      
      #update js
      
      
    end
    
    def choose
      Camera::choose_picture('/app/Picture/camera_callback') 
    end
    
    def show_image
      $id = @params['id']
      picture = Picture.find($id)
      @uri = picture.uri
      
      load_image
    end
    
    def load_image
      Rho::NativeTabbar.switch_tab(1)
      $uri = @uri
#      WebView.execute_js "show_image(\"#{@uri}\");"
      render :string => ""
    end
    
    def imguri
      render :string => $uri, :layout => false
    end
    
    def save
      @uri = @params["image_content"]
      @uri.gsub!(/ /,"+")
      picture = Picture.create({:uri => @uri})
      #load_image
    end
end
