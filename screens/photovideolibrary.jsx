
import {
    AppState,
    Image,
    Linking,
    PermissionsAndroid,
    Platform,
    Pressable,
    SafeAreaView,
    Text,
    View
} from "react-native";
import Styles from "../global/styles";
import React, {useEffect, useRef, useState} from "react";

import {Directions, FlatList, ScrollView, Gesture, GestureDetector} from "react-native-gesture-handler";
import Animated, {FadeIn, FadeOut, runOnJS, SlideInLeft, SlideInRight, SlideOutRight} from "react-native-reanimated";
import {BottomSheetFlashList, BottomSheetFlatList} from "@gorhom/bottom-sheet";
import IconButton from "./iconbutton";
import {
    faAlbum, faCamera,
    faCheckCircle, faFilms,
    faImages, faNewspaper,
    faPage, faPhotoVideo,
    faPlusCircle,
    faTimes,
    faVideo
} from "@fortawesome/pro-regular-svg-icons";
import LanguageSelector from "../language/languageselector";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import FastImage from "react-native-fast-image";
import VerticalAligner from "./verticalaligner";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import Button from "./button";
import Header from "./header";
import Variables from "../global/variables";
import Time from "../utils/time";
import Data from "../utils/data";

const PhotoVideoLibrary = (props) => {

    const [photos, setPhotos] = useState([]); // [{type:photo, uri:uri, thumbnail:thumbnail}, {type:video, uri:uri, thumbnail:thumbnail}

    const [videos, setVideos] = useState([]); // [{type:photo, uri:uri, thumbnail:thumbnail}, {type:video, uri:uri, thumbnail:thumbnail}

    const [photosVideosExtraData, setPhotosVideosExtraData] = useState(0);

    const [selectedPhotosVideos, setSelectedPhotosVideos] = useState([]);

    const lastPhotoCursor = useRef(null);

    const lastVideoCursor = useRef(null);

    const [mediaType, setMediaType] = useState('Photos'); // 0:photos, 1:videos, 2:albums

    const photosAlreadyFetchRef = useRef(false);

    const videosAlreadyFetchRef = useRef(false);

    const [permissions, setPermissions] = useState({
        photos:false,
        videos:false
    })



    /*******USE EFFECTS********/

    useEffect(() => {

        if(Platform.OS === 'ios') {
            setPermissions({photos:true, videos:true});
        }

        AppState.addEventListener('change', nextAppState => {

            if(Platform.OS === 'android') {

                if (nextAppState === 'active') {

                    checkPermissions();

                }

            }


        });

    }, [])

    useEffect(() => {

        if(Platform.OS === 'android') {

            checkPermissions();

        }else{

            if(mediaType == 'Photos'){

                if(!photosAlreadyFetchRef.current){

                    getPhotos(false);

                }

            }

            if(mediaType == 'Videos'){

                if(!videosAlreadyFetchRef.current){

                    getVideos(false);

                }

            }

        }

    }, [mediaType])


    /*******END USE EFFECTS********/

    const checkPermissions = () => {

        if(mediaType == 'Photos'){

            PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES).then(response => {

                if(!response){
                    requestImagePermission();
                }else{

                    setPermissions({photos: true, videos:permissions.videos});

                    if(!photosAlreadyFetchRef.current){

                        getPhotos(false);

                    }

                }

            });

        }

        if(mediaType == 'Videos'){

            PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO).then(response => {

                if(!response){
                    requestVideoPermission();
                }else{

                    setPermissions({photos: permissions.photos, videos:true});

                    if(!videosAlreadyFetchRef.current){

                        getVideos(false)

                    }

                }

            });

        }

    }

    const requestImagePermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
                {
                    title: 'Pixelmine ',
                    message:
                        'Pixelmine needs access to your image library',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {

                setPermissions({photos: true, videos:permissions.videos});

                if(!photosAlreadyFetchRef.current){

                    getPhotos(false);

                }

            } else {
                setPermissions({photos: false, videos:permissions.videos});
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const requestVideoPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
                {
                    title: 'Pixelmine ',
                    message:
                        'Pixelmine needs access to your video library',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {

                setPermissions({photos: permissions.photos, videos:true});

                if(!videosAlreadyFetchRef.current){

                    getVideos(false)

                }

            } else {
                setPermissions({photos: permissions.photos, videos:false});
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const getVideos = async(refresh) => {

        if(!refresh) {

            let tempVideos = [];

            CameraRoll.getPhotos({
                first: 10,
                groupTypes: 'All',
                assetType: 'Videos',
            }).then((r) => {

                lastVideoCursor.current = r.page_info.end_cursor;

                for (let i = 0; i < r.edges.length; i++) {

                    let m = {
                        id: r.edges[i].node.id,
                        uri: r.edges[i].node.image.uri,
                        type: r.edges[i].node.type,
                        selected: 0,
                        height: r.edges[i].node.image.height,
                        width: r.edges[i].node.image.width,
                        size: r.edges[i].node.image.fileSize
                    };

                    tempVideos.push(m);
                    tempVideos.push(m);
                    tempVideos.push(m);
                    tempVideos.push(m);
                    tempVideos.push(m);
                    tempVideos.push(m);
                    tempVideos.push(m);
                    tempVideos.push(m);
                    tempVideos.push(m);




                }

                setVideos(tempVideos);

            });

        }else{

            CameraRoll.getPhotos({
                first: 10,
                groupTypes: 'All',
                assetType: 'Videos',
                after: lastVideoCursor.current,
            }).then((r) => {

                lastVideoCursor.current = r.page_info.end_cursor;

                for (let i = 0; i < r.edges.length; i++) {

                    let m = {
                        id: r.edges[i].node.id,
                        uri: r.edges[i].node.image.uri,
                        type: r.edges[i].node.type,
                        selected: 0,
                        height: r.edges[i].node.image.height,
                        width: r.edges[i].node.image.width,
                        size: r.edges[i].node.image.fileSize
                    };

                    setVideos(videos => [...videos, m]);

                }

            });

        }

        videosAlreadyFetchRef.current = true;

    }

    const getPhotos = async(refresh) => {

        if(!refresh) {

            let tempPhotos = [];

            CameraRoll.getPhotos({
                first: 10,
                groupTypes: 'All',
                assetType: 'Photos',
            }).then((r) => {

                lastPhotoCursor.current = r.page_info.end_cursor;

                for (let i = 0; i < r.edges.length; i++) {

                    let m = {
                        id: r.edges[i].node.id,
                        uri: r.edges[i].node.image.uri,
                        type: r.edges[i].node.type,
                        selected: 0,
                        height: r.edges[i].node.image.height,
                        width: r.edges[i].node.image.width,
                        size: r.edges[i].node.image.fileSize
                    };

                    tempPhotos.push(m);

                }

                setPhotos(tempPhotos);

            });

        }else{

            CameraRoll.getPhotos({
                first: 10,
                groupTypes: 'All',
                assetType: 'Photos',
                after: lastPhotoCursor.current,
            }).then((r) => {

                lastPhotoCursor.current = r.page_info.end_cursor;

                for (let i = 0; i < r.edges.length; i++) {

                    let m = {
                        id: r.edges[i].node.id,
                        uri: r.edges[i].node.image.uri,
                        type: r.edges[i].node.type,
                        selected: 0,
                        height: r.edges[i].node.image.height,
                        width: r.edges[i].node.image.width,
                        size: r.edges[i].node.image.fileSize
                    };

                    setPhotos(photos => [...photos, m]);

                }

            });

        }

        photosAlreadyFetchRef.current = true;

    }

    const remove = (id) => {

        /*let tempPhotosVideos = [...photosVideos];

        for(let i = 0; i < tempPhotosVideos.length; i++) {

            if (tempPhotosVideos[i].id === id) {

                tempPhotosVideos[i].selected = 0;

                setPhotosVideos(tempPhotosVideos);

            }

        }

        let tempSelectedPhotosVideos = [...selectedPhotosVideos];

        for(let i = 0; i < tempSelectedPhotosVideos.length; i++){

            if(tempSelectedPhotosVideos[i].id === id) {
                tempSelectedPhotosVideos.splice(i, 1);
                setSelectedPhotosVideos(tempSelectedPhotosVideos);
                setSelectedPhotosVideosExtraData(Math.random());
                break;
            }

        }*/

    }

    const select = (id) => {


        if(mediaType == 'Photos'){

            for(let i = 0; i < photos.length; i++){

                if(photos[i].id === id) {

                    if(photos[i].selected == 0){

                        photos[i].selected = 1;

                        props.selectRemoveAssets(photos[i], true);

                    }else{

                        photos[i].selected = 0;

                        props.selectRemoveAssets(photos[i], false);

                    }


                    break;

                }

            }

        }

        if(mediaType == 'Videos'){

            for(let i = 0; i < videos.length; i++){

                if(videos[i].id === id) {

                    if(videos[i].selected == 0){

                        videos[i].selected = 1;

                        props.selectRemoveAssets(videos[i], true);

                    }else{

                        videos[i].selected = 0;

                        props.selectRemoveAssets(videos[i], false);

                    }


                    break;

                }

            }

        }

        setPhotosVideosExtraData(Math.random())

    }

    const renderPhotoVideoItem = ({ item, index }) => {

        return(
            <PhotoVideoItem key={index} item={item} index={index} select={select}/>
        );

    }

    const renderSelectedPhotoVideoItem = ({ item, index }) => {

        return(
            <SelectedPhotoVideoItem key={index} item={item} index={index} remove={remove}/>
        );

    }

    const onEndReached = () => {

        if(mediaType == 'Photos'){

            if(photosAlreadyFetchRef.current){

                getPhotos(true);

            }

        }


        if(mediaType == 'Videos'){

            if(videosAlreadyFetchRef.current){

                getVideos(true);

            }

        }

    }

    const add = () => {w

        props.useSelection(selectedPhotosVideos);

        setSelectedPhotosVideos([]);

        let tempPhotosVideos = [...photosVideos];

        for(let i = 0; i < tempPhotosVideos.length; i++){

            tempPhotosVideos[i].selected = 0;

        }

        setPhotosVideos(tempPhotosVideos);



    }

    const changeMediaType = (type) => {

        setMediaType(type);

    }

    const gotoSettings = () => {
        Linking.openSettings();
    }


    return(

        <View style={{flexDirection:"column"}}>

            {props.showHeader && (

                <View style={[Styles.bottomsheet.bottomsheet_content_container_2, {borderBottomWidth:0}]}>

                    {/****HEADER****/}
                    <View style={Styles.bottomsheet.bottomsheet_header_container} >

                        <View style={Styles.bottomsheet.bottomsheet_header_title_container}>

                            <Text style={Styles.bottomsheet.bottomsheet_header_title}>
                                {LanguageSelector.getText('photos_videos_library_title')}
                            </Text>

                        </View>

                    </View>
                    {/****END HEADER****/}

                </View>

            )}

            {/****OPTIONS****/}
            {props.showOptions && (


            <View style={{height:30, width:"100%", flexDirection:'row', borderBottomWidth:1, borderBottomColor:Styles.containerBorderColor, backgroundColor:Styles.backgroundColor}}>

                <View style={{position:"absolute", right:10, top:0, flexDirection:"row"}}>

                    <Pressable style={{flexDirection:'column', width:50}} onPress={() => changeMediaType('Photos')}>
                        <VerticalAligner/>
                        <FontAwesomeIcon icon={faImages} size={20} style={{alignSelf:"center"}} color={Styles.fontSubColor}/>
                        <VerticalAligner/>
                    </Pressable>

                    <Pressable style={{flexDirection:'column', width:50}} onPress={() => changeMediaType('Videos')}>
                        <VerticalAligner/>
                        <FontAwesomeIcon icon={faFilms} size={20} style={{alignSelf:"center"}} color={Styles.fontSubColor}/>
                        <VerticalAligner/>
                    </Pressable>

                    <Pressable style={{flexDirection:'column', width:50}} >
                        <VerticalAligner/>
                        <FontAwesomeIcon icon={faCamera} size={20} style={{alignSelf:"center"}} color={Styles.fontSubColor}/>
                        <VerticalAligner/>
                    </Pressable>

                </View>

            </View>


            )}
            {/****END OPTIONS****/}

            {/****PHOTOS AND VIDEOS****/}
            <View style={{height:500, overflow:'hidden', backgroundColor:Styles.whiteColor}}>

                {(permissions.photos && mediaType == 'Photos') && (

                    <View style={{margin:10}}>

                    <FlatList
                        extraData={photosVideosExtraData}
                        onEndReachedThreshold={.5}
                        onEndReached={onEndReached}
                        numColumns={3}
                        estimatedItemSize={50}
                        data={photos}
                        maxToRenderPerBatch={10}
                        renderItem={renderPhotoVideoItem}/>

                    </View>

                )}


                {(!permissions.photos && mediaType == 'Photos') && (


                    <View style={{flex:1}}>

                        <VerticalAligner/>

                        <Text style={{letterSpacing:Styles.letterSpacing, textAlign:'center', color: Styles.fontColor, fontSize: 14, lineHeight: 20, fontFamily: Styles.fontFamily, marginLeft:20, marginRight:20}}>
                            {LanguageSelector.getText('photo_video_library_no_permission')}
                        </Text>



                        <Button style={{backgroundColor:Styles.backgroundColor, marginTop:20, width:200, alignSelf:'center'}} label= {LanguageSelector.getText('photo_video_library_no_permission_button')} onPress={gotoSettings}/>


                        <VerticalAligner/>

                    </View>

                )}

                {(permissions.videos && mediaType == 'Videos') && (



                    <BottomSheetFlatList
                        extraData={photosVideosExtraData}
                        onEndReachedThreshold={.5}
                        onEndReached={onEndReached}
                        numColumns={3}
                        estimatedItemSize={50}
                        data={videos}
                        maxToRenderPerBatch={10}
                        renderItem={renderPhotoVideoItem}/>

                )}


                {(!permissions.videos && mediaType == 'Videos') && (


                    <View style={{flex:1}}>

                        <VerticalAligner/>

                        <Text style={{letterSpacing:Styles.letterSpacing, textAlign:'center', color: Styles.fontColor, fontSize: 14, lineHeight: 20, fontFamily: Styles.fontFamily, marginLeft:20, marginRight:20}}>
                            {LanguageSelector.getText('photo_video_library_no_permission')}
                        </Text>



                        <Button style={{backgroundColor:Styles.backgroundColor, marginTop:20, width:200, alignSelf:'center'}} label= {LanguageSelector.getText('photo_video_library_no_permission_button')} onPress={gotoSettings}/>


                        <VerticalAligner/>

                    </View>

                )}



            </View>
            {/****END PHOTOS AND VIDEOS****/}

        </View>


    );

}

export default PhotoVideoLibrary;


const PhotoVideoItem = (props) => {

    return(
        <Pressable style={{flex:1, height:200, margin:1, backgroundColor:Styles.fontColor, borderRadius:10, overflow:'hidden'}} onPress={() => props.select(props.item.id)}>

            <Image source={{uri:props.item.uri}} style={{flex:1}}/>

            {props.item.selected === 1 && (

                <View style={{position:'absolute', top:75, alignSelf:'center', width:30, height:30, borderRadius:15, opacity:.8, backgroundColor:Styles.whiteColor}}>
                    <VerticalAligner/>
                    <FontAwesomeIcon icon={faCheckCircle} size={20} color={Styles.greenColor} style={{alignSelf:'center'}}/>
                    <VerticalAligner/>
                </View>

            )}



        </Pressable>
    );

}

const SelectedPhotoVideoItem = (props) => {

    return(

        <View style={{width:100, height:150, margin:1, backgroundColor:Styles.fontColor, borderRadius:10, overflow:'hidden'}} onPress={() => props.remove(props.item.id)}>

            <Image source={{uri:props.item.uri}} style={{flex:1}}/>

            <Pressable style={{position:'absolute', top:60, alignSelf:'center', width:30, height:30, borderRadius:15, opacity:.8, backgroundColor:Styles.whiteColor}} onPress={() => props.remove(props.item.id)}>
                <VerticalAligner/>
                <FontAwesomeIcon icon={faTimes} size={20} color={Styles.redColor} style={{alignSelf:'center'}}/>
                <VerticalAligner/>
            </Pressable>

        </View>
    );

}
