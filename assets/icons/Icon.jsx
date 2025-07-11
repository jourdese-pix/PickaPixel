import { View, Text } from 'react-native'
import { House, HeartHandshake, Mail, Plus, Camera, Search, Bell, SquarePen, Ellipsis, EllipsisVertical, ChevronLeft, Tags,
    Video, Image, Star, Flag, MessageCircle, SmilePlus, Forward, Earth, CircleUserRound, FileSliders, UsersRound, MessageSquareLock,
    UserRoundX, DraftingCompass, ReceiptText, Shield, LogOut, AtSign, Tag, Phone, 
 } from 'lucide-react-native';
import { availableParallelism } from 'os';
const icons = {
    home: House, 
    mail: Mail,
    plus: Plus,
    hearthandshake: HeartHandshake,
    camera: Camera,
    search: Search,
    bell: Bell,
    squarepen: SquarePen,
    ellipsis: Ellipsis,
    ellipsisvertical: EllipsisVertical,
    chevronleft: ChevronLeft,
    tags: Tags,
    video: Video,
    image: Image,
    star: Star,
    flag: Flag,
    messagecircle: MessageCircle,
    smileplus: SmilePlus,
    forward: Forward,
    earth: Earth,
    circleuserround: CircleUserRound,
    filesliders: FileSliders,
    usersround: UsersRound,
    messagesquarelock: MessageSquareLock,
    userroundx: UserRoundX,
    draftingcompass: DraftingCompass,
    receipttext: ReceiptText,
    shield: Shield,
    logout: LogOut,
    atsign: AtSign,
    tag: Tag,
    phone: Phone,

}

const Icon = ({name, ...props}) => {
    const IconComponent = icons[name];
  return (
    <IconComponent
        height={props.size || 25}
        width={props.size || 25}
        strokeWidth={props.strokeWidth || 1.46}
        color={props.color || '#333'}
        {...props}
    />
  )
}

export default Icon;